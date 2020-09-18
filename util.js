var fs = require('fs');
function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer.from(bitmap).toString('base64');
}
function getDate() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var date = now.getDate();
  return `${year}年${month+1}月${date}日`
}
function transVariableInHtml(data, html) {
  for (let key in data) {
    html = html.replace(`{{${key}}}`, data[key])
  }
  return html
}
module.exports = {
  base64_encode,
  getDate,
  transVariableInHtml
}