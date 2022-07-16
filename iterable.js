const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);
// const log = curry(console.log);
const log = console.log;

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
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  /** 변수가 두 개만 들어왔을 경우에 iter를 생성해준다. */
  if (!iter) {
    /** acc에 iter 값이 왔으므로 acc의 iterator를 반환받고 */
    iter = acc[Symbol.iterator]();
    /** acc의 첫 iter의 결과물을 acc에 저장한다 */
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const go = (...args) => {
  /**
   * reduce의 정의에 의해 인자가 둘일 때 args iterator의 0번째 value가 아래의 a가 되고,
   * f는 두번째 인자 즉 callback 함수들로 구성된다
   * f(a)를 해줌으로써 go의 두 번째 인자의 callback 함수는 실행되게 된다.
   * 그 실행 결과를 reduce가 다시 반환하여 결과는 다시 a에 들어가게 되고 이는 계속 반복되가 protocol이 종료되면
   * 함께 종료된다.
   */
  reduce((a, f) => f(a), args);
};

/**
 * @example pipe 함수의 인자를 두 개 이상 전달하고 싶은 경우
 * ```ts
 *
 * const pipe = (...fs) => (a) => go(a, ...fs); // go함수 내부의 reduce함수에 의해 args의 첫 인자가 분리되어 reduce에 전달 됨
 *
 * const f = pipe(
 * (a,b)=>a+b,
 * a=>a+1,
 * log
 * )
 *
 * ```
 *
 *
 * f, ...fs로 pipe의 data를 pipe의 첫 함수를 따로 분리한다.
 * pipe에 인자들을 넘겨주기 위한 ...as pipe 함수의 첫 함수에 인자들을 넘겨주기 위해 받은 것들을
 * go 함수에 넘겨주면서 시작시킨다.
 *
 */
const pipe = curry(
  (f, ...fs) =>
    (...as) =>
      go(f(...as), ...fs)
);
/**
 * const f = pipe(
 * (a,b)=> a+b,
 * a=>a+1,
 * a=>a+2,
 * log
 * )
 *
 *
 */

const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i === 0
          ? { value: undefined, done: true }
          : { value: --i, done: false };
      },

      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

/**
 * 무한한 iterable 객체를 반환합니다.
 *  */
function* infinity(i = 0) {
  while (true) yield i++;
}

/**
 * 총 길이가 iter 횟수가 정해져 있는 iterable을 반환합니다.
 */
function* limit(limit, iter) {
  for (const a of iter) {
    yield a;
    if (a === limit) return;
  }
}

function* odds(l) {
  /**
   * 각 iterable 함수가 동작할 때 함께 평가되고 이전 값들을 기억하고 있기 때문에 반복문이 작함
   */
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

/**
 * iterable protocol을 따르기 때문에 아래처럼 for ... of문에서 작동함
 *
 * 또한 iterable protocol을 따르는 다른 문법도 사용가능함
 */
// for (const a of odds(20)) log(a);

// const [head, ...tail] = odds(5);

const products = [
  { name: "a name", price: 5000 },
  { name: "b name", price: 4000 },
  { name: "c name", price: 3000 },
  { name: "d name", price: 2000 },
];

const add = (a, b) => {
  return a + b;
};

// go(
//   products,
//   base_price((p) => p.price > 1000),
//   log
// );

const products1 = [
  { name: "a name", price: 5000, qty: 1 },
  { name: "b name", price: 4000, qty: 2 },
  { name: "c name", price: 3000, qty: 3 },
  { name: "d name", price: 2000, qty: 4 },
];

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};
L.range = function* range(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

function tester(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

// log("range 10");
// go(range(10), reduce(add), log);
// log("---------------------------");

// log("L.range 10");
// go(L.range(10), reduce(add), log);

tester("range", 10, () => reduce(add, range(10000)));
tester("range", 10, () => reduce(add, L.range(10000)));
