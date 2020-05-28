/**
 * Return a random color in RGB
 * @returns {string}
 */
export function getRandomColorRGB() {
  const c1 = getRandomColorNumberRGB();
  const c2 = getRandomColorNumberRGB();
  const c3 = getRandomColorNumberRGB();
  return `rgb(${c1},${c2},${c3})`;
}

/**
 * Return a random number from 0 to 255
 * @returns {number}
 */
export function getRandomColorNumberRGB() {
  return Math.floor(Math.random() * Math.floor(256));
}

/**
 * Return a random color in HSLA
 * @returns {string}
 */
export function getRandomColorHSL() {
  const hue = getRandomHueHSL();
  return `hsl(${getRandomHueHSL()}, 80%, 50%)`;
}

/**
 * Return a random number from 0 to 255
 * @returns {number}
 */
export function getRandomHueHSL() {
  return Math.floor(Math.random() * Math.floor(360));
}

/**
 * Return the coordinates in an SVG based on a event (e.g. mouse)
 * @param {SVGSVGElement} svg
 * @param {SyntheticMouseEvent} the mouse event
 * @returns {[Number, Number]}
 */
export function getPointInSvgFromEvent(svg, event) {
  const { offsetX, offsetY, touches } = event.nativeEvent;
  const x = touches ? touches[0].clientX : offsetX;
  const y = touches ? touches[0].clientY : offsetY;
  return getPointInSvg(svg, x, y);
}

/**
 * Return the coordinates in an SVG based on the DOM
 * @param {SVGSVGElement} svg
 * @param {Number} otherX
 * @param {Number} otherY
 * @returns {[Number, Number]}
 */
export function getPointInSvg(svg, otherX, otherY) {
  const pt = svg.createSVGPoint();

  pt.x = otherX;
  pt.y = otherY;
  const { x, y } = pt.matrixTransform(svg.getScreenCTM().inverse());
  return [x, y];
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

export function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(decodeURIComponent(str))
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

export function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
      match,
      p1
    ) {
      return String.fromCharCode("0x" + p1);
    })
  );
}

window.panoencode = b64EncodeUnicode;
window.panodecode = b64DecodeUnicode;
