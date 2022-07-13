/**
 * @see https://www.oreilly.com/library/view/hands-on-functional-programming/9781788831437/d3234c19-df94-49e3-ab09-f0da9fbb71f7.xhtml
 *
 */
const users = [
  {
    name: "KIM",
    age: 55,
    country: "IT",
  },
  {
    name: "KAG",
    age: 15,
    country: "KT",
  },
  {
    name: "WWG",
    age: 25,
    country: "KT",
  },
  {
    name: "KMG",
    age: 12,
    country: "PT",
  },
  {
    name: "WWG",
    age: 25,
    country: "KT",
  },
  {
    name: "KIG",
    age: 12,
    country: "PK",
  },
];

function _getcurr() {
  return _curryr(_get);
}
const _getc = _getcurr();

function _is_object(obj) {
  return typeof obj === "object" && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

export function _each(list: any, iter: any) {
  const keys = _keys(list);

  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }
  return list;
}

_each(
  {
    kakao: "1kakak",
    2: "2",
  },
  (n) => console.log(n)
);

export function _filter<T>(list: T[], predi: (arg: any) => boolean): T[] {
  const new_list: any[] = [];
  _each(list, (val) => {
    predi(val) && new_list.push(val);
  });
  return new_list;
}
function _map(list: any, mapper: any) {
  const new_list: any = [];
  _each(list, (val: any) => {
    new_list.push(mapper(val));
  });

  return new_list;
}

export function _get(obj: any, key: string) {
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

function _pipe(...fns) {
  // 함수 배열을 받아 reduce에 넣은 함수를 반환하는 함수
  return function (arg) {
    //arg는 pipe함수를 호출한 함수가 넣어줄 인자
    return _reduce(fns, (arg, fn) => fn(arg), arg); //함수 배열을 넣어 줌 위에서 받은 인자를 iter에 넣음
  };
}

const f1 = _pipe(
  (a) => a + 1,
  (a) => a + 2,
  (a) => a + 3
);

// console.log("f1", f1(5));

function _go(arg, ...args) {
  const fns = _rest(args, 1);
  return _pipe.apply(null, fns)(arg);
}

_go(
  1,
  (a) => a + 1,
  (a) => a + 2,
  (a) => a + 3,
  console.log
);

// _go(
//   users,
//   (users) => _filter(users, (user) => user.age > 1),
//   (users) => _map(users, (user) => _get(user, "name")),
//   console.log
// );

const _mapr = _curryr(_map);
const _filterr = _curryr(_filter);

// _go(
//   users,
//   _filterr((user) => user.age > 5),
//   _mapr((user) => _get(user, "name")),
//   console.log
// );

// console.log(_each([1, 2, 3], console.log));
