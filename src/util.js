/**
 * Return a random color in RGB
 * @returns {string}
 */
export function getRandomColor() {
  const c1 = getRandomColorNumber();
  const c2 = getRandomColorNumber();
  const c3 = getRandomColorNumber();
  return `rgb(${c1},${c2},${c3})`;
}

/**
 * Return a random number from 0 to 255
 * @returns {number}
 */
export function getRandomColorNumber() {
  return Math.floor(Math.random() * Math.floor(256));
}
