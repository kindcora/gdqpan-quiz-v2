(function () {
  'use strict';
  const records = {};
  window.SourceSolutions = {
    revision: '2026-09-12-pdf-1', records,
    add(chapter, rows) {
      rows.forEach(([number, key, result, steps, extra = {}]) => {
        const id = 'source-' + chapter + '-' + String(number).padStart(3, '0');
        const original = window.VLDC_SOURCE_LIBRARY.questions.find(q => q.id === id);
        if (!original || records[id]) throw new Error('Invalid solution ID: ' + id);
        records[id] = { id, chapter, number, key, result, steps, pages: [...new Set(original.segments.map(s => s.page))], status: key === null ? 'review' : 'solved', ...extra };
      });
    }
  };
})();
