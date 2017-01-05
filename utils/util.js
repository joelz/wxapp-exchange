function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatCalResult(input, result) {
    input = input.toString();
    var n = 0;
    if (input.split(".")[1]) {
        n = input.split(".")[1].length;
    }

    if (n == 0)
        n = 2;

    return parseFloat(result.toFixed(n));
}

module.exports = {
    formatTime: formatTime,
    formatCalResult: formatCalResult
}
