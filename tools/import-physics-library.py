"""Import source-page renders and OCR navigation into a faithful study library.

Requires Pillow. Render each supplied PDF with pdftoppm -scale-to 2200 -jpeg
-jpegopt quality=90, using exercises-NN.jpg / lectures-NN.jpg names. OCR JSON
must contain Tesseract blocks/paragraphs/lines and text; it is used only for
navigation/search, never as authoritative mathematical content or an answer key.
"""
from pathlib import Path
import argparse, hashlib, json, re, shutil, unicodedata
from collections import Counter
from PIL import Image

def normalize(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text).lower().replace('đ', 'd') if not unicodedata.combining(c))

def get_lines(path):
    data = json.loads(path.read_text(encoding='utf-8'))
    lines = [line for block in data.get('blocks') or [] for para in block.get('paragraphs', []) for line in para.get('lines', [])]
    return sorted(lines, key=lambda l: (l['bbox']['y0'], l['bbox']['x0']))

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--sources', type=Path, required=True)
    parser.add_argument('--renders', type=Path, required=True)
    parser.add_argument('--ocr', type=Path, required=True)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--reuse-pages', action='store_true', help='Reuse renders only when the source PDFs have not changed')
    args = parser.parse_args()
    assets = args.root / 'physics/assets/library'
    for folder in ['pages', 'questions', 'pdf']:
        (assets / folder).mkdir(parents=True, exist_ok=True)
    chapter_starts = [(2, 1), (11, 2), (18, 3), (26, 4), (35, 5), (42, 6)]
    chapter_ends = {1: 10, 2: 17, 3: 25, 4: 34, 5: 41, 6: 47}
    lecture_ranges = {1: [7, 18], 2: [19, 26], 3: [27, 35], 4: [36, 47], 5: [48, 53], 6: []}
    names = {'exercises': 'BAI_TAP_VAT_LY_DAI_CUONG_FULL.pdf', 'lectures': 'BAI_TAP_VAT_LY_DAI_CUONG_FULL-1.pdf'}
    counts = {'exercises': 47, 'lectures': 56}
    titles = ['Điện học', 'Từ học', 'Cảm ứng điện từ', 'Trường điện từ, dao động và sóng', 'Quang học', 'Vật lý lượng tử']
    docs = []
    for key, source_name in names.items():
        source = args.sources / source_name
        shutil.copyfile(source, assets / 'pdf' / f'{key}.pdf')
        pages = []
        for n in range(1, counts[key] + 1):
            img = Image.open(args.renders / f'{key}-{n:02}.jpg').convert('RGB')
            name = f'{key}-{n:02}.webp'
            if not args.reuse_pages or not (assets / 'pages' / name).exists():
                img.save(assets / 'pages' / name, 'WEBP', quality=88, method=6)
            pages.append({'page': n, 'image': f'assets/library/pages/{name}', 'width': img.width, 'height': img.height})
        docs.append({'id': key, 'title': 'Bài tập gốc' if key == 'exercises' else 'Bài giảng gốc', 'originalName': source_name, 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'pdf': f'assets/library/pdf/{key}.pdf', 'pages': pages})
    lines_by_page = {n: get_lines(args.ocr / f'exercises-{n:02}.json') for n in range(2, 48)}
    starts = []
    topic = ''
    for page, lines in lines_by_page.items():
        chapter = max(ch for start, ch in chapter_starts if start <= page)
        for line in lines:
            text = line['text'].strip()
            if re.match(r'^dang\s+\d+[.:]', normalize(text)):
                topic = text
            match = re.match(r'^cau\s+(\d+)\.', normalize(text))
            if match:
                starts.append({'chapter': chapter, 'number': int(match[1]), 'page': page, 'top': line['bbox']['y0'], 'topic': topic})
    assert len(starts) == 250, f'Expected 250 questions, found {len(starts)}'
    for chapter, expected in [(1,41),(2,41),(3,45),(4,41),(5,41),(6,41)]:
        assert [q['number'] for q in starts if q['chapter'] == chapter] == list(range(1, expected+1))
    questions = []
    for i, start in enumerate(starts):
        chapter = start['chapter']
        nxt = starts[i+1] if i+1 < len(starts) and starts[i+1]['chapter'] == chapter else None
        last_page = nxt['page'] if nxt else chapter_ends[chapter]
        qid = f"source-ch{chapter:02}-{start['number']:03}"
        segments, text_parts = [], []
        for page in range(start['page'], last_page+1):
            image = Image.open(args.renders / f'exercises-{page:02}.jpg').convert('RGB')
            top = start['top'] - 12 if page == start['page'] else 112
            bottom = nxt['top'] - 16 if nxt and page == nxt['page'] else 2080
            # Exclude the heading of the next section, but not ordinary text containing 'dạng'.
            for line in lines_by_page[page]:
                if top < line['bbox']['y0'] < bottom and re.match(r'^(?:(?:dang|phan)\s+\d+[.:]|\d+\.\d+\.)', normalize(line['text'])):
                    # Heading boxes start above their OCR text baseline. Find the border.
                    heading_top = line['bbox']['y0']
                    for y in range(max(top, heading_top-70), heading_top):
                        row = [image.getpixel((x,y)) for x in range(100,image.width-100,4)]
                        if sum(max(rgb)-min(rgb)>30 for rgb in row) > len(row)*0.65:
                            heading_top = y
                            break
                    bottom = heading_top - 8
                    break
            if bottom <= top:
                continue
            crop = image.crop((98, max(0, top), image.width-98, bottom))
            # Trim trailing whitespace, preserving every visible mark and diagram.
            gray = crop.convert('L')
            bbox = gray.point(lambda x: 255 if x < 215 else 0).getbbox()
            if not bbox:
                continue
            trim_top = max(0,bbox[1]-10)
            crop = crop.crop((0, trim_top, crop.width, min(crop.height, bbox[3]+12)))
            filename = f'{qid}-{len(segments)+1}.webp'
            crop.save(assets / 'questions' / filename, 'WEBP', quality=92, method=6)
            segments.append({'page': page, 'image': f'assets/library/questions/{filename}', 'width': crop.width, 'height': crop.height, 'sourceBox':[98,top+trim_top,image.width-98,top+trim_top+crop.height]})
            text_parts.extend(line['text'].strip() for line in lines_by_page[page] if top <= line['bbox']['y0'] < bottom)
        assert segments, qid
        text = ' '.join(text_parts)
        # Only explicit A-D or a)-d) labels enable corresponding answer controls.
        letters = set(re.findall(r'\b([ABCD])[.)]\s', text))
        statements = set(re.findall(r'\b([abcd])\)\s', text))
        kind = 'tf' if len(statements) >= 3 else ('mcq' if len(letters) >= 3 else 'short')
        # Visually verified source sections and formula-only choices missed by OCR.
        if chapter in (1,4):
            kind = 'mcq' if start['number'] <= 26 else ('short' if start['number'] <= 36 else 'tf')
        if chapter == 2 and start['number'] in (4,8,9,16):
            kind = 'mcq'
        if chapter == 6 and start['number'] in (11,26):
            kind = 'mcq'
        questions.append({'id': qid, 'chapter': f'ch{chapter:02}', 'number': start['number'], 'kind': kind, 'topic': start['topic'], 'searchText': text, 'segments': segments})
    chapters = []
    for n in range(1,7):
        group = [q for q in questions if q['chapter'] == f'ch{n:02}']
        chapters.append({'id':f'ch{n:02}', 'title':titles[n-1], 'questionCount':len(group), 'exercisePages':[s[0] for s in chapter_starts if s[1]==n]+[chapter_ends[n]], 'lecturePages':lecture_ranges[n]})
    result = {'version':1, 'sourceQuestionCount':250, 'documents':docs, 'chapters':chapters, 'questions':questions,
              'notes':{'lectureScope':'File bài giảng có 53 trang bìa, mục lục và nội dung; 3 trang cuối nối sang quyển bài tập. Phần giảng dừng giữa mục 5.3.3, chưa có phần còn lại của Quang học và Module 6.', 'duplicates':[{'document':'lectures','pages':[54,55,56],'correspondTo':{'document':'exercises','pages':[1,2,3]}}], 'answerKey':'Tài liệu bài tập không kèm bảng đáp án. Lựa chọn và ghi chú là bài làm tự lưu, không phải kết quả chấm.'}}
    (args.root/'physics/data/source-library.js').write_text('window.VLDC_SOURCE_LIBRARY = '+json.dumps(result,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
    manifest = {'sourceQuestionCount':250, 'documents':[{k:v for k,v in d.items() if k!='pages'} for d in docs], 'chapters':chapters, 'questions':[{'id':q['id'],'kind':q['kind'],'pages':[s['page'] for s in q['segments']]} for q in questions], 'notes':result['notes']}
    (args.root/'physics/data/source-library-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    referenced = {Path(seg['image']).name for q in questions for seg in q['segments']}
    for file in (assets/'questions').glob('*.webp'):
        if file.name not in referenced:
            file.unlink()  # Only obsolete generated fragments in this exact output directory.
    print('Questions:',len(questions),'types:',dict(Counter(q['kind'] for q in questions)))
    print('Page images:',sum(len(d['pages']) for d in docs),'question fragments:',sum(len(q['segments']) for q in questions))

if __name__ == '__main__':
    main()
