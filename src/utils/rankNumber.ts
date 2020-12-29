/* eslint-disable no-extend-native */

Number.prototype.rankNumber = function (this:string) {
  let rankNumber = ''
  switch (this.toString().length) {
    case 1:
      rankNumber = this
      break
    case 2:
      rankNumber = this
      break
    case 3:
      rankNumber = `${this} K`
      break
    case 4:
      rankNumber = `${this} M`
      break
  }

  return rankNumber
}
