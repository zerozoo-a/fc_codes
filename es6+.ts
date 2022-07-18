import {
  range,
  map,
  take,
  pipe,
  filter,
  toArray,
  reduce,
  reject,
} from "@fxts/core";
const log = console.log;

pipe(
  range(1, 6),
  map((_) => toArray(range(_))),
  map((_) => {
    return pipe(
      _,
      map((_) => "*"),
      toArray
    );
  }),
  map((_) => {
    return pipe(
      _,
      reduce((a: string, b: string): string => {
        return `${a}${b}`;
      }),
      log
    );
  }),
  toArray
  // take(100)
  // reduce((a: string, b: string): string => `${a}\n${b}`),
  // toArray,
  // log
);

// pipe(
//   range(2, 10),
//   map((a) =>
//     pipe(
//       range(1, 10),
//       toArray,
//       (_) => {
//         console.log("___", _);
//         return _;
//       },
//       map((b) => `${a}*${b}`),
//       log
//     )
//   ),
//   log
// );

pipe(
  range(2, 10),
  toArray,
  map((a) =>
    pipe(
      range(1, 10),
      toArray,
      map((_) => {
        return `${_}*${a}`;
      }),
      toArray
    )
  ),
  toArray,
  log
);

const querys = {
  a: 1,
  b: undefined,
  c: "CC",
  d: "D_IS_D",
};

const query3 = (obj = querys) =>
  pipe(
    querys,
    (a) => Object.entries(a),
    reject(([_, v]) => v === undefined),
    map(([k, v]) => `${k}=${v}`),
    reduce((a, b) => `${a}&${b}`),
    log
  );

query3();

const split = curry((sep, str) => str.split(sep));

function* values(obj) {
  for (const k in obj) {
    yield obj[k];
  }
}
function* keys(obj) {
  for (const k in obj) {
    yield k;
  }
}

export {};
