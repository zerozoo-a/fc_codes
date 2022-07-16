const _ = require("./iterable");

const L = {};
const log = console.log;

L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
};

const it_map = L.map((a) => a + 1, [1, 2, 3]);
log([...it_map]); // L.map을 배열로 꺼내는 방법 // 평가가 진행되지 않았을 경우

L.filter = function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
};

const it_filter = L.filter((a) => a % 2, [1, 2, 3, 4, 5, 6]);
log([...it_filter]);
