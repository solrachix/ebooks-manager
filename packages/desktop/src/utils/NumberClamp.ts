/* eslint-disable no-extend-native */

Number.prototype.clamp = function (this: number, lower: number, upper: number) {
  return Math.min(Math.max(this, lower), upper)
}
