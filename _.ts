export function _filter<T>(list: T[], predi: (arg: any) => boolean): T[] {
  const new_list: any[] = [];
  for (let i: number = 0; i < list.length; i++) {
    if (predi(list[i])) {
      new_list.push(list[i]);
    }
  }

  return new_list;
}

export function _get(obj: { [key: string]: any }, key: string): any {
  return obj === null ? undefined : obj[key];
}

export function _curry(fn: (a: any, b: any) => any): (a: any, b?: any) => any {
  return function (a: any, b: any): any {
    return arguments.length === 2 ? fn(a, b) : (b: any): any => fn(a, b);
  };
}

export function _curryr(fn: (a: any, b: any) => any): (a: any, b?: any) => any {
  return function (a: any, b: any): any {
    return arguments.length === 2 ? fn(a, b) : (b: any): any => fn(b, a);
  };
}

export function _map<T>(list: T[], mapper: (arg: T) => any): any[] {
  const new_list: any = [];
  for (let i: number = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }
  return new_list;
}

function _map2<T>(list: T[], mapper: (arg: T) => any): any[] {
  const new_list: any = [];
  _each(list, function (val: any): void {
    new_list.push(mapper(val));
  });
  return new_list;
}

export function _each(list: any[], iter: any) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
}
export function _rest<T>(list: ArrayLike<T>, num: number) {
  return Array.prototype.slice.call(list, num || 1);
}

export function _reduce<T>(list: T[], iter, memo) {
  if (arguments.length === 2) {
    memo = list[0];
    list = _rest<T>(list, 1);
  }
  _each(list, (val) => {
    memo = iter(memo, val);
  });
  return memo;
}
// console.log(_reduce<number>([1, 2, 3], (a, b) => a + b, 0));

// function _pipe(fns) {
//   const fns: IArguments = arguments;
//   console.log("fns", fns);
//   return function (arg) {
//     return _reduce(fns, (arg, fn) => fn(arg), arg);
//   };
// }

// const f1 = _pipe(
//   (a) => a + 1,
//   (a) => a + 2
// );
/**
 * @see https://www.oreilly.com/library/view/hands-on-functional-programming/9781788831437/d3234c19-df94-49e3-ab09-f0da9fbb71f7.xhtml
 */

export const _pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value);

export function _pipe(...fns: Array<(arg: T) => T>) {
  return function (value: T) {
    return _reduce(fns, (arg, fn) => fn(arg), arg);
  };
}
