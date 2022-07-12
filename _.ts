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
console.log(_reduce<number>([1, 2, 3], (a, b) => a + b, 0));
