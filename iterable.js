const log = console.log;
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const reduce = (f, acc, iter) => {
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
};

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
  log("iter", iter);
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
