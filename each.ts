export function _each(list: any[], iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
}
