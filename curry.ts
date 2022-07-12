export const log = console.log;

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

const add = _curry((a, b) => a + b);

let foo = add(1)(2); // 3
log("foo1", foo);
foo = add(1, 2); // 3
log("foo2", foo);
foo = add(3);

var fofo5 = add(5);
fofo5 = fofo5(3);
log("fofo", fofo5);
