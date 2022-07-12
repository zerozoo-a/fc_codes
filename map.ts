export function _map<T>(list: T[], mapper: (arg: T) => any): any[] {
  const new_list: any = [];
  for (let i: number = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }
  return new_list;
}
