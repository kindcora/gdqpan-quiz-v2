# Parse GDQPAN banks. ASCII script; Vietnamese lives in data files.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$hp1Path = Join-Path $root 'data\raw\hp1.txt'
$hp2Path = Join-Path $root 'data\raw\hp2.txt'
$mapPath = Join-Path $root 'data\raw\spelling.json'

$spellingPairs = @((Get-Content -LiteralPath $mapPath -Encoding UTF8 -Raw) | ConvertFrom-Json)

function Get-Lines([string]$path) {
  $raw = [System.IO.File]::ReadAllText($path, [System.Text.UTF8Encoding]::new($false))
  $raw = $raw -replace [char]0x000B, "`n"
  $raw = $raw -replace "`r`n", "`n"
  $raw = $raw -replace "`r", "`n"
  return @($raw -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ })
}

function Test-LessonHeader([string]$line) { return $line -match '^(?i)b\S{1,4}\s+\d+\s*:' }
function Test-TitleSkip([string]$line) { return $line -match 'DC1QP06' -or $line -match '^(?i)tr\S+\s+nghi' }
function Test-Answer([string]$line) { return $line -match '^ANSWER\s*:' }
function Get-AnswerLetter([string]$line) {
  if ($line -match 'ANSWER\s*:\s*([A-Da-d])') { return $Matches[1].ToUpper() }
  return $null
}

function Split-OptionChunks([string]$line) {
  $answerFromGlue = $null
  if ($line -match '^(.*?)ANSWER\s*:\s*([A-Da-d])\s*(.*)$') {
    $before = $Matches[1].Trim()
    $answerFromGlue = $Matches[2].ToUpper()
    $after = $Matches[3].Trim()
    if ($after -and $after -notmatch '^[A-D][\.\,]') {
      $before = ($before + ' ' + $after).Trim()
    }
    $line = $before
  }

  $chunks = New-Object System.Collections.Generic.List[object]
  $rx = [regex]'(?i)(?:^|(?<=[\s\.\;\:]))([A-D])(?:[\.\,]|\s+(?=\S))\s*'
  # tighter: only treat as option marker if A-D at start or after . ; or whitespace before letter+punct
  $rx = [regex]'(?:^|(?<=[\.\;]\s)|(?<=\s))([A-D])[\.\,]\s*'
  $ms = $rx.Matches($line)
  if ($ms.Count -eq 0) {
    # "C Text" without punctuation, first letter only
    if ($line -match '^([A-D])\s+(.+)$') {
      $chunks.Add([pscustomobject]@{ letter = $Matches[1].ToUpper(); text = $Matches[2].Trim() })
      return @{ chunks = $chunks; answer = $answerFromGlue }
    }
    return @{ chunks = @(); answer = $answerFromGlue }
  }

  for ($i = 0; $i -lt $ms.Count; $i++) {
    $m = $ms[$i]
    $letter = $m.Groups[1].Value.ToUpper()
    $start = $m.Index + $m.Length
    $end = if ($i + 1 -lt $ms.Count) { $ms[$i + 1].Index } else { $line.Length }
    $text = $line.Substring($start, $end - $start).Trim()
    $chunks.Add([pscustomobject]@{ letter = $letter; text = $text })
  }
  return @{ chunks = $chunks; answer = $answerFromGlue }
}

function Repair-Text([string]$text) {
  if ([string]::IsNullOrWhiteSpace($text)) { return @{ text = ''; fixed = $false } }
  $fixed = $false
  $t = $text.Trim()

  foreach ($pair in $spellingPairs) {
    $from = [string]$pair[0]
    $to = [string]$pair[1]
    if ($from -and $t.Contains($from)) {
      $t = $t.Replace($from, $to)
      $fixed = $true
    }
  }

  $collapsed = [regex]::Replace($t, '\s{2,}', ' ').Trim()
  if ($collapsed -ne $t) {
    $t = $collapsed
    $fixed = $true
  }
  return @{ text = $t; fixed = $fixed }
}

function Parse-Bank([string[]]$lines, [string]$source) {
  $questions = New-Object System.Collections.Generic.List[object]
  $issues = New-Object System.Collections.Generic.List[object]
  $lesson = ''
  $pendingStem = New-Object System.Collections.Generic.List[string]
  $current = $null
  $lastChoice = $null
  $index = 0

  function Reset-Current {
    $script:cur = $null
    $script:lastCh = $null
  }

  $script:cur = $null
  $script:lastCh = $null

  function Save-Current {
    if ($null -eq $script:cur) { return }
    $q = $script:cur
    $missing = @('A','B','C','D') | Where-Object { -not $q.choices.ContainsKey($_) -or [string]::IsNullOrWhiteSpace([string]$q.choices[$_]) }
    if ($missing.Count -gt 0 -or -not $q.answer) {
      $issues.Add([pscustomobject]@{
        source = $source
        originalIndex = $q.originalIndex
        reason = $(if (-not $q.answer) { 'thieu-dap-an' } else { 'thieu-lua-chon' })
        missing = ($missing -join ',')
        stem = $q.stem
      })
      Reset-Current
      return
    }
    $questions.Add($q)
    Reset-Current
  }

  foreach ($rawLine in $lines) {
    $line = $rawLine.Trim()
    if (-not $line) { continue }
    if (Test-TitleSkip $line) { continue }

    if (Test-LessonHeader $line) {
      Save-Current
      $pendingStem.Clear()
      $lesson = $line
      continue
    }

    if (Test-Answer $line) {
      if ($null -eq $script:cur) {
        $issues.Add([pscustomobject]@{
          source = $source
          originalIndex = $null
          reason = 'answer-khong-gan-cau'
          missing = ''
          stem = $line
        })
        continue
      }
      $script:cur.answer = Get-AnswerLetter $line
      Save-Current
      $pendingStem.Clear()
      continue
    }

    $split = Split-OptionChunks $line
    if ($split.chunks.Count -gt 0) {
      if ($null -eq $script:cur) {
        $index++
        $stemJoin = ($pendingStem -join ' ').Trim()
        $stemFix = Repair-Text $stemJoin
        $script:cur = [pscustomobject]@{
          source = $source
          originalIndex = $index
          lesson = $lesson
          stem = $stemFix.text
          choices = @{}
          answer = $split.answer
          spellingFixed = [bool]$stemFix.fixed
          flags = New-Object System.Collections.Generic.List[string]
        }
        if ($split.chunks.Count -gt 1) { $script:cur.flags.Add('merged-split') }
        $pendingStem.Clear()
      } elseif ($split.chunks.Count -gt 1) {
        if (-not $script:cur.flags.Contains('merged-split')) { $script:cur.flags.Add('merged-split') }
      }

      foreach ($ch in $split.chunks) {
        $fix = Repair-Text $ch.text
        if ($script:cur.choices.ContainsKey($ch.letter) -and $script:cur.choices[$ch.letter]) {
          $script:cur.choices[$ch.letter] = ($script:cur.choices[$ch.letter] + ' ' + $fix.text).Trim()
        } else {
          $script:cur.choices[$ch.letter] = $fix.text
        }
        if ($fix.fixed) { $script:cur.spellingFixed = $true }
        $script:lastCh = $ch.letter
      }
      if ($split.answer -and -not $script:cur.answer) { $script:cur.answer = $split.answer }
      continue
    }

    if ($script:cur -and $script:lastCh) {
      $fix = Repair-Text $line
      $script:cur.choices[$script:lastCh] = ($script:cur.choices[$script:lastCh] + ' ' + $fix.text).Trim()
      if ($fix.fixed) { $script:cur.spellingFixed = $true }
    } else {
      $pendingStem.Add($line)
    }
  }

  Save-Current
  return @{ questions = $questions; issues = $issues }
}

$hp1 = Parse-Bank (Get-Lines $hp1Path) 'HP1'
$hp2 = Parse-Bank (Get-Lines $hp2Path) 'HP2'

$all = New-Object System.Collections.Generic.List[object]
$issues = New-Object System.Collections.Generic.List[object]
foreach ($item in $hp1.issues) { $issues.Add($item) }
foreach ($item in $hp2.issues) { $issues.Add($item) }

function Escape-Json([string]$s) {
  if ($null -eq $s) { return '' }
  $s = $s.Replace('\', '\\').Replace('"', '\"').Replace("`r", '\r').Replace("`n", '\n').Replace("`t", '\t')
  return $s
}

function To-Record($q, $prefix) {
  $id = '{0}-{1:D3}' -f $prefix.ToLower(), $q.originalIndex
  return [pscustomobject]@{
    id = $id
    source = $q.source
    originalIndex = [int]$q.originalIndex
    lesson = [string]$q.lesson
    stem = [string]$q.stem
    A = [string]$q.choices['A']
    B = [string]$q.choices['B']
    C = [string]$q.choices['C']
    D = [string]$q.choices['D']
    answer = [string]$q.answer
    spellingFixed = [bool]$q.spellingFixed
    flags = @($q.flags | ForEach-Object { [string]$_ })
  }
}

foreach ($q in $hp1.questions) { $all.Add((To-Record $q 'hp1')) }
foreach ($q in $hp2.questions) { $all.Add((To-Record $q 'hp2')) }

Write-Host ("PARSE HP1={0} HP2={1} TOTAL={2}" -f $hp1.questions.Count, $hp2.questions.Count, $all.Count)
Write-Host ("PARSE issues hp1={0} hp2={1}" -f $hp1.issues.Count, $hp2.issues.Count)

$stems = @{}
foreach ($q in $all) {
  if (-not $stems.ContainsKey($q.stem)) { $stems[$q.stem] = New-Object System.Collections.Generic.List[object] }
  $stems[$q.stem].Add($q)
}
foreach ($key in @($stems.Keys)) {
  if ($stems[$key].Count -gt 1) {
    foreach ($q in $stems[$key]) {
      if ($q.flags -notcontains 'duplicate-stem') { $q.flags = @($q.flags + 'duplicate-stem') }
      $issues.Add([pscustomobject]@{
        source = $q.source
        originalIndex = $q.originalIndex
        reason = 'trung-stem'
        missing = ''
        stem = $q.stem
      })
    }
  }
}

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('{')
[void]$sb.AppendLine('  "generatedFrom": ["CAU HOI TRAC NGHIEM HP1.docx", "CAU HOI TRAC NGHIEM HP2.docx.doc"],')
[void]$sb.AppendLine(('  "count": {0},' -f $all.Count))
[void]$sb.AppendLine(('  "hp1": {0},' -f $hp1.questions.Count))
[void]$sb.AppendLine(('  "hp2": {0},' -f $hp2.questions.Count))
[void]$sb.AppendLine('  "questions": [')
for ($i = 0; $i -lt $all.Count; $i++) {
  $q = $all[$i]
  $flagJson = if ($q.flags.Count -gt 0) { '[' + (($q.flags | ForEach-Object { '"' + (Escape-Json $_) + '"' }) -join ',') + ']' } else { '[]' }
  $spell = if ($q.spellingFixed) { 'true' } else { 'false' }
  $comma = if ($i -lt $all.Count - 1) { ',' } else { '' }
  $obj = '    {"id":"' + (Escape-Json $q.id) + '","source":"' + (Escape-Json $q.source) + '","originalIndex":' + $q.originalIndex + ',"lesson":"' + (Escape-Json $q.lesson) + '","stem":"' + (Escape-Json $q.stem) + '","choices":{"A":"' + (Escape-Json $q.A) + '","B":"' + (Escape-Json $q.B) + '","C":"' + (Escape-Json $q.C) + '","D":"' + (Escape-Json $q.D) + '"},"answer":"' + (Escape-Json $q.answer) + '","spellingFixed":' + $spell + ',"flags":' + $flagJson + '}' + $comma
  [void]$sb.AppendLine($obj)
}
[void]$sb.AppendLine('  ]')
[void]$sb.AppendLine('}')

$isb = New-Object System.Text.StringBuilder
$skipN = @($issues | Where-Object { $_.reason -eq 'thieu-lua-chon' -or $_.reason -eq 'thieu-dap-an' }).Count
[void]$isb.AppendLine('{')
[void]$isb.AppendLine(('  "count": {0},' -f $issues.Count))
[void]$isb.AppendLine(('  "skippedFromPractice": {0},' -f $skipN))
[void]$isb.AppendLine('  "items": [')
for ($i = 0; $i -lt $issues.Count; $i++) {
  $it = $issues[$i]
  $comma = if ($i -lt $issues.Count - 1) { ',' } else { '' }
  $idx = if ($null -eq $it.originalIndex) { 'null' } else { [string]$it.originalIndex }
  $line = '    {"source":"' + (Escape-Json ([string]$it.source)) + '","originalIndex":' + $idx + ',"reason":"' + (Escape-Json ([string]$it.reason)) + '","missing":"' + (Escape-Json ([string]$it.missing)) + '","stem":"' + (Escape-Json ([string]$it.stem)) + '"}' + $comma
  [void]$isb.AppendLine($line)
}
[void]$isb.AppendLine('  ]')
[void]$isb.AppendLine('}')

$outQ = Join-Path $root 'data\questions.json'
$outI = Join-Path $root 'data\issues.json'
$utf8 = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($outQ, $sb.ToString(), $utf8)
[System.IO.File]::WriteAllText($outI, $isb.ToString(), $utf8)

Write-Host ("WROTE questions={0} issues={1} skipped={2}" -f $all.Count, $issues.Count, $skipN)

$all | Select-Object -First 3 | ForEach-Object {
  Write-Host ("---- {0} ans={1} flags={2}" -f $_.id, $_.answer, ($_.flags -join ','))
  Write-Host $_.stem
  Write-Host ("A|{0}" -f $_.A)
  Write-Host ("B|{0}" -f $_.B)
  Write-Host ("C|{0}" -f $_.C)
  Write-Host ("D|{0}" -f $_.D)
}

Write-Host '---- SKIPPED ----'
$issues | Where-Object { $_.reason -eq 'thieu-lua-chon' -or $_.reason -eq 'thieu-dap-an' } | ForEach-Object {
  Write-Host ("{0} #{1} {2} missing={3} {4}" -f $_.source, $_.originalIndex, $_.reason, $_.missing, $_.stem)
}
