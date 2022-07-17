import { range, map, take, pipe, filter, toArray, reduce } from "@fxts/core";
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

// log("stars", stars);
export {};
