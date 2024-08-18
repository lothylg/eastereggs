

function randomNumber(min=1, max=15){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  randomNumber
}