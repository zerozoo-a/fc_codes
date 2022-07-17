const L = {};
const nop = Symbol("nop");
const log = console.log;
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

function curry(f) {
  return function (a, ..._) {
    return _.length ? f(a, ..._) : (..._) => f(a, ..._);
  };
}

// const map = curry((f, iter) => {
//   let res = [];
//   for (const a of iter) {
//     res.push(f(a));
//   }
//   return res;
// });

// const filter = curry((f, iter) => {
//   let res = [];
//   for (const a of iter) {
//     if (f(a)) {
//       res.push(a);
//     }
//   }
//   return res;
// });

function promiseHelper(a, f) {
  return a instanceof Promise ? a.then(f) : f(a);
}
const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  return promiseHelper(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = f(acc, a);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
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
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then((a) => {
            res.push(a);
            if (res.length === l) return res;

            return recur();
          })
          .catch((e) => (e === nop ? recur() : Promise.reject(e)));
      }

      res.push(a);

      if (res.length === l) return res;
    }

    return res;
  })();
  //   let cur;
  //   while (!(cur = iter.next()).done) {
  //     const a = cur.value;

  //     if(a instanceof Promise) return a.then(a=>{
  //         res.push(a);
  //         if(res.length === l) return res;
  //     })

  //     res.push(a);
  //     if (res.length === l) return res;
  //   }

  //   return res;
});
const takeAll = take(Infinity);

// const pipe = (...fs) => (a) => go(a,...fs);
const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

L.map = curry(function* (f, iter) {
  for (const a of iter) yield promiseHelper(a, f);
});

L.range = function* (l) {
  let i = -1;
  while (++i < l) yield i;
};

// const it_map = L.map((a) => a + 1, [1, 2, 3]);
// log([...it_map]); // L.map을 배열로 꺼내는 방법 // 평가가 진행되지 않았을 경우

L.filter = curry(function* (f, iter) {
  // for (const a of iter) if (f(a)) yield a;
  for (const a of iter) {
    const b = promiseHelper(a, f);
    if (b instanceof Promise)
      yield b.then((b) => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
  }

  //   iter = iter[Symbol.iterator]();
  //   let cur;
  //   while (!(cur = iter.next()).done) {
  //     const a = cur.value;
  //     if (f(a)) {
  //       yield a;
  //     }
  //   }
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
    if (isIterable(a)) yield* f(a); // 재귀함수를 호출한다
    else yield a;
  }
};

L.flatMap = curry(pipe(L.map, L.flatten));
console.clear();

const it_filter = L.filter((a) => a % 2, [1, 2, 3, 4, 5, 6]);

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

const map = curry(pipe(L.map, take(Infinity)));
const filter = curry(pipe(L.filter, take(Infinity)));

const deep = [
  [1, 2],
  [3, 5, 4],
  [6, 7, 8, 9],
];
// go(
//   deep,
//   L.flatten,
//   L.filter((a) => a % 2),
//   take(1),
//   log
// );

/* Promise*/

function add10(a, callback) {
  setTimeout(() => callback(a + 10), 100);
}
// add10(5, (r) => log(r));

function add20(a) {
  return new Promise((r) => setTimeout(() => r(a + 20), 100));
}
// add20(5).then(log);
const delay100 = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 100));

const add5 = (a) => a + 5;
// log(go1(delay100(10), add5));

// Kleisli composition

const usersForError = [
  { id: 1, name: "aa" },
  { id: 2, name: "bb" },
  { id: 3, name: "cc" },
];

// go(
//   Promise.resolve(1),
//   (a) => a + 1,
//   (a) => Promise.reject("hihi"),
//   (a) => log("hi?", a),
//   log
// ).catch((a) => log(a));

go(
  [1, 2, 3, 4, 5, 6],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => a % 2),
  L.map((a) => Promise.resolve(a * a)),
  L.map((a) => Promise.resolve(a * a)),
  L.map((a) => Promise.resolve(a * a)),
  take(2),
  log
);
