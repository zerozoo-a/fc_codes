function _reduce(list, iter, memo) {}

_reduce(
  [1, 2, 3],
  function (a, b) {
    return a + b;
  },
  0
); // 6
