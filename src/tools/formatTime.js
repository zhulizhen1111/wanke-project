const formatTime = (str) => {
  return str.split("/")[0] + (str.split('/')[1] > 10 ? str.split('/')[1] : 0 + str.split('/')[1] )
}
module.exports = {
    formatTime 
}