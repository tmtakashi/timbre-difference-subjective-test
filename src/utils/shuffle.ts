/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 * @return {Array} shuffled array
 */
export default function (a: string[][]): string[][] {
  let j:number; let x:string[]; let i: number;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}
