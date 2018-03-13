export function sumStrings(a, b) {
  let res = '';
  let c = 0;
  const numALst = `${a}`.split('');
  const numBLst = `${b}`.split('');
  while (numALst.length || numBLst.length || c) {
    c += ~~numALst.pop() + ~~numBLst.pop();
    res = (c % 10) + res;
    c = c > 9;
  }
  return res.replace(/^0+/, '');
}

export const numStrMax = numStrList => numStrList.sort((a, b) => a - b).pop();
