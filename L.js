const L = {};
const log = console.log;

function curry(f) {
  return function (a, ..._) {
    return _.length ? f(a, ..._) : (..._) => f(a, ..._);
  };
}

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) {
      res.push(a);
    }
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const go = (...args) => {
  return reduce((a, f) => f(a), args);
};

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
const take = curry((l, iter) => {
  log("?????????????", iter);
  let res = [];
  for (const a of iter) {
    res.push(a);
    log("a", a);
    if (res.length === l) return res;
  }
});

// const pipe = (...fs) => (a) => go(a,...fs);
const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

L.map = curry(function* (f, iter) {
  for (const a of iter) yield f(a);
});

L.range = function* (l) {
  let i = -1;
  while (++i < l) yield i;
};

// const it_map = L.map((a) => a + 1, [1, 2, 3]);
// log([...it_map]); // L.map을 배열로 꺼내는 방법 // 평가가 진행되지 않았을 경우

L.filter = curry(function* (f, iter) {
  //   for (const a of iter) if (f(a)) yield a;
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) {
      yield a;
    }
  }
});

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};
const isIterable = (a) => a && a[Symbol.iterator];

/**
 *  `yield * a === for (const val of iterable) yield val`
 */
L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) yield b;
    } else {
      yield a;
    }
  }
};
L.flatten_short = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};

const it_filter = L.filter((a) => a % 2, [1, 2, 3, 4, 5, 6]);
// log([...it_filter]);

go(
  range(10),
  map((a) => a + 10),
  take(5),
  log
);

go(
  L.range(10),
  L.map((a) => a + 10),
  L.filter((n) => n % 2),
  take(2),
  log
);

const join = curry((sep = ",", iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter)
);
const queryStr = pipe(
  //   Object.entries,
  //   (a) => (log("this is an a", a), a),
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join("&")
);
log(queryStr({ limit: 10, offset: 1, type: "notice" }));

const users = [
  { a: 1 },
  { a: 2 },
  { a: 3 },
  { a: 4 },
  { a: 5 },
  { a: 6 },
  { a: 1111111 },
];

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

log(find((u) => u.a > 6)(users));
go(
  users,
  find((n) => n.a > 1),
  log
);

const map_L_ver = curry(pipe(L.map, take(Infinity)));
const filter_L_ver = curry(pipe(L.filter, take(Infinity)));
