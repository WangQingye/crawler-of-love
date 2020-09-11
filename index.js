const getInfo = require('./crawler.js')
async function getTodayInfo() {
  const info = await getInfo()
  console.log(info);
}
getTodayInfo()