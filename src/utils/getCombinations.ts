export default (list: string[]): string[][] => {
  const result = [];
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i + 1; j < list.length; j++) {
      result.push([list[i], list[j]]);
    }
  }
  return result;
};
