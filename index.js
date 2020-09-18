const fs = require('fs');
const getInfo = require('./crawler.js')
const sendMail = require('./mailer.js')
const { base64_encode, getDate, transVariableInHtml } = require('./util.js')
async function getHtml() {
  let data = {};
  let info = {};
  let config = {
    lover: '小野',
    city: '成都',
    constellation: '处女座'
  }
  async function getTodayInfo() {
    info = await getInfo()
    const img = base64_encode(`./love/Love (${info.days}).jpg`)
    data = {img: `data:image/jpg;base64,${img}`, ...config};
    data.date = getDate()
    data.days = info.days
    data.temperature = info.weather.temperature
    data.weather = info.weather.weather
    data.constellationText = info.constellation.today.summary
    data.constellationNumber = info.constellation.today.all
    data.loveTalk = info.loveTalk
  }
  await getTodayInfo()
  var html = fs.readFileSync('index.html', 'utf8');
  html = transVariableInHtml(data, html);
  return {html, days: data.days}
}
async function gogogo() {
  const { html, days } = await getHtml()
  // fs.writeFileSync(`test${days}.html`, html, 'utf8')
  sendMail('2910047303@qq.com',`love letter ${days}`, html);
  sendMail('329103586@qq.com',`love letter ${days}`, html);
}
setInterval(()=>{
  let time = new Date()
  if (time.getHours() === 8 && time.getMinutes() === 0) {
    gogogo()
  }
}, 60 * 1000)