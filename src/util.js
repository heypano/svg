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

/**
 * Return a color that is proportionate to the width value passed
 * @param {Number} mouseX - the current x value of the mouse/finger
 * @param {Number} mouseY  - the current y value of the mouse/finger
 */
export function getColorByMousePosition(mouseX, mouseY) {
  const hue = (360 * mouseX) / window.innerWidth;
  const lightness = `${(100 * mouseY) / window.innerHeight}%`;
  const saturation = "50%";
  return `hsl(${hue}, ${saturation}, ${lightness})`;
}
