export function _filter<T>(list: T[], predi: (arg: any) => boolean): T[] {
  const new_list: any[] = [];
  for (let i: number = 0; i < list.length; i++) {
    if (predi(list[i])) {
      new_list.push(list[i]);
    }
  }

  return new_list;
}
