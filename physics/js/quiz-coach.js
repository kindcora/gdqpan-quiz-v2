/* Use the reviewed question itself as the single source for coaching.
   Do not keep a second answer/formula bank indexed separately from mcq. */
(function () {
  window.VLDC_QUIZ_COACH = {};
  (window.VLDC_CHAPTERS || []).forEach(function (chapter) {
    window.VLDC_QUIZ_COACH[chapter.id] = (chapter.mcq || []).map(function (question) {
      return {
        formula: question.whyCorrect,
        tip: question.reviewTip || 'Đọc đúng điều kiện của đề; đổi đơn vị trước khi thay số. Đối chiếu cả giá trị, đơn vị và chiều của đại lượng.',
        ok: 'Đối chiếu cách làm của bạn với lập luận và điều kiện áp dụng dưới đây.',
        bad: ''
      };
    });
  });
})();
