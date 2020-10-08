
/* eslint-disable no-extend-native */

Number.prototype.round = function (this: number, places = 2) {
  return parseFloat(this.toFixed(places))
}
