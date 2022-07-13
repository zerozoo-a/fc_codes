const log = console.log;
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
const _mapr = _curryr(_map);
const _filterr = _curryr(_filter);
const _getr = _curryr(_get);

function _is_object(obj) {
  return typeof obj === "object" && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

export function _each(list, iter) {
  const keys = _keys(list);

  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }
  return list;
}

export function _filter(list, predi) {
  const new_list = [];
  _each(list, (val) => {
    predi(val) && new_list.push(val);
  });
  return new_list;
}

function _map(list, mapper) {
  const new_list = [];
  _each(list, (val) => {
    new_list.push(mapper(val));
  });

  return new_list;
}

export function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(a, b);
  };
}

export function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(b, a);
  };
}

export function _rest(list, num) {
  return Array.prototype.slice.call(list, num || 1);
}

export function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    memo = list[0];
    list = _rest(list, 1);
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

function _go(arg, ...args) {
  const fns = _rest(args, 1);
  return _pipe.apply(null, fns)(arg);
}

export function _get(obj, key) {
  return obj === null ? undefined : obj[key];
}

export function _values(data) {
  return _map(data, _identity);
}

export function _identity(val) {
  return val;
}

export function _pluck(data, key) {
  return _map(data, _getr(key));
}

export function _reject(data, predi) {
  return _filter(data, _negate(predi));
}

export function _negate(fn) {
  return (val) => !fn(val);
}

const _compact = _filterr(_identity);

log("values", _values(users[0]));
log("keys", _keys(users[0]));
log("_pluck", _pluck(users, "age"));
log(
  "_reject",
  _reject(users, (v) => v.age > 20)
);

log("compact>>>", _compact([1, 2, 0, false, {}]));
