export function invert(n) {
  const number = Number(n);
  if (isNaN(number)) return "";
  return -number;
}

export function mul(a, b) {
  const nA = Number(a);
  const nB = Number(b);
  if (isNaN(nA) || isNaN(nB)) return "";
  return nA * nB;
}

export function div(a, b) {
  const nA = Number(a);
  const nB = Number(b);
  if (isNaN(nA) || isNaN(nB)) return "";
  return nA / nB;
}

export function add(a, b) {
  const nA = Number(a);
  const nB = Number(b);
  if (isNaN(nA) || isNaN(nB)) return "";
  return nA + nB;
}

export function sub(a, b) {
  const nA = Number(a);
  const nB = Number(b);
  if (isNaN(nA) || isNaN(nB)) return "";
  return nA - nB;
}
