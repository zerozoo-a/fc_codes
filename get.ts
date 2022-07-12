import { log, _curry, _curryr } from "./curry";

export function _get(obj: { [key: string]: any }, key: string): any {
  return obj === null ? undefined : obj[key];
}
export const _getr = _curryr(_get);

const user1 = { age: 1, name: "zoo" };

log(_get(user1, "name"));
log(_getr("name")(user1));
