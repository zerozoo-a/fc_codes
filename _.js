const { users } = require("./mock_data");

const log = console.log;
const _mapc = _curryr(_map);
const _filterc = _curryr(_filter);
const _getc = _curryr(_get);
const _findc = _curryr(_find);
const _compact = _filterc(_identity);
const _somec = _curryr(_some);
const _everyc = _curryr(_every);
const _min_byc = _curryr(_min_by);
const _max_byc = _curryr(_max_by);
const _group_byc = _curryr(_group_by);
const _count_byc = _curryr(_count_by);

function _is_object(obj) {
  return typeof obj === "object" && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

function _each(list, iter) {
  const keys = _keys(list);

  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i]);
  }
  return list;
}

function _filter(list, predi) {
  const new_list = [];
  _each(list, (val) => {
    predi(val) && new_list.push(val);
  });
  return new_list;
}

function _map(list, mapper) {
  const new_list = [];
  _each(list, (val, key) => {
    new_list.push(mapper(val, key));
  });

  return new_list;
}

function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(a, b);
  };
}

function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(b, a);
  };
}

function _rest(list, num) {
  return Array.prototype.slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
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

function _go(arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

function _get(obj, key) {
  return obj === null ? undefined : obj[key];
}

function _values(data) {
  return _map(data, _identity);
}

function _identity(val) {
  return val;
}

function _pluck(data, key) {
  return _map(data, _getr(key));
}

function _reject(data, predi) {
  return _filter(data, _negate(predi));
}

function _negate(fn) {
  return (val) => !fn(val);
}

function _find(list, predi) {
  const keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    const val = list[keys[i]];
    if (predi(val)) return val;
  }
}

function _find_index(list, predi) {
  const keys = _keys(list);
  for (let i = 0; (len = keys.length), i < len; i++) {
    if (predi(list[keys[i]])) return i;
  }
  return -1;
}

function _some(data, predi) {
  return _find_index(data, predi || _identity) !== -1;
}

function _every(data, predi) {
  return _find_index(data, _negate(predi || _identity)) == -1;
}

function _min(data) {
  return _reduce(data, (a, b) => (a < b ? a : b));
}

function _max(data) {
  return _reduce(data, (a, b) => (a > b ? a : b));
}

function _min_by(data, iter) {
  return _reduce(data, (a, b) => (iter(a) < iter(b) ? a : b));
}
function _max_by(data, iter) {
  return _reduce(data, (a, b) => (iter(a) < iter(b) ? a : b));
}

function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj;
}

function _group_by(data, iter) {
  return _reduce(
    data,
    (grouped, val) =>
      /**
       * grouped[key]는 이미 있는 경우 {key:[..., val]} : {key:[].push(val)}의 형태가 된다.
       */
      _push(grouped, iter(val), val),
    {}
  );
}

function _pp(count, key) {
  count[key] ? count[key]++ : (count[key] = 1);
  return count;
}

function _count_by(data, iter) {
  return _reduce(
    data,
    (count, val) => {
      return _pp(count, iter(val));
    },
    {}
  );
}

function _pairs() {
  return _map((val, key) => [key, val]);
}

_go(
  users,
  _count_byc((u) => u.age - (u.age % 10)),
  _mapc((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
  (list) => list.join(""),
  log
);

function square(a) {
  return new Promise(function (res) {
    setTimeout(function () {
      res(a * a);
    }, 500);
  });
}

square(1)
  .then(square)
  .then(square)
  .then(square)
  .then(square)
  .then(square)
  .then(log);
