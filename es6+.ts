import {
  range,
  map,
  take,
  pipe,
  filter,
  toArray,
  reduce,
  reject,
  indexBy,
} from "@fxts/core";
const log = console.log;

// pipe(
//   range(1, 6),
//   map((_) => toArray(range(_))),
//   map((_) => {
//     return pipe(
//       _,
//       map((_) => "*"),
//       toArray
//     );
//   }),
//   map((_) => {
//     return pipe(
//       _,
//       reduce((a: string, b: string): string => {
//         return `${a}${b}`;
//       }),
//       log
//     );
//   }),
//   toArray
//   // take(100)
//   // reduce((a: string, b: string): string => `${a}\n${b}`),
//   // toArray,
//   // log
// );

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

// pipe(
//   range(2, 10),
//   toArray,
//   map((a) =>
//     pipe(
//       range(1, 10),
//       toArray,
//       map((_) => {
//         return `${_}*${a}`;
//       }),
//       toArray
//     )
//   ),
//   toArray,
//   log
// );

const querys = {
  a: 1,
  b: undefined,
  c: "CC",
  d: "D_IS_D",
};

// const query3 = (obj = querys) =>
//   pipe(
//     querys,
//     (a) => Object.entries(a),
//     reject(([_, v]) => v === undefined),
//     map(([k, v]) => `${k}=${v}`),
//     reduce((a, b) => `${a}&${b}`),
//     log
//   );

// query3();

// const split = curry((sep, str) => str.split(sep));

function* values(obj: { [k: string | number]: any }) {
  for (const k in obj) {
    yield obj[k];
  }
}
function* keys(obj: { [k: string | number]: any }) {
  for (const k in obj) {
    yield k;
  }
}

function* entries(obj: { [k: string | number]: any }) {
  for (const k in obj) {
    yield [k, obj[k]];
  }
}

// function* keys(obj: { [k: string | number]: any }) {
//   for (const k in obj) {
//     yield k;
//   }
// }

const a = [
  { id: "a", age: 1 },
  { id: "b", age: 7 },
  { id: "c", age: 6 },
  { id: "d", age: 5 },
  { id: "e", age: 4 },
  { id: "f", age: 3 },
  { id: "g", age: 2 },
];

const object = (entries: any) =>
  reduce((obj, [k, v]) => ((obj[k] = v), obj), {}, entries);

pipe(
  a,
  indexBy(({ id }) => id),
  entries,
  filter(([_, { age }]) => age > 5),
  toArray,
  object,
  log
);
export {};
