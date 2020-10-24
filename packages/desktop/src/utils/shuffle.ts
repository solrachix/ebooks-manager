/* eslint-disable no-extend-native */

Array.prototype.shuffle = function shuffle (this) {
  let m = this.length; let t; let i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = this[m]
    this[m] = this[i]
    this[i] = t
  }

  return this
}
