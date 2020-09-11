const axios = require('axios')
const moment = require('moment');
const startTime = new Date('2020-09-10').getTime()
const config = {
  city: '成都',
  constellation: '处女座'
}
async function getWeather() {
  const res = await axios.get(`https://api.asilu.com/weather`, {
    params: {
      city: config.city
    }
  })
  const weather = res.data.weather[0]
  // {
  //   "date": "周四 09月10日",
  //   "icon1": "day/yin",
  //   "icon2": "night/xiaoyu",
  //   "weather": "阴转小雨",
  //   "wind": "东风3-4级",
  //   "temp": "33 ~ 24℃"
  // }
  return weather
}
async function getConstellation() {
  const res = await axios.get(`http://web.juhe.cn:8080/constellation/getAll`, {
    params: {
      consName: config.constellation,
      key: 'e8b6a94a20310ee2952adbba9b7de081'
    }
  })
  // {
  //   date: 20200910,
  //   name: '处女座',
  //   QFriend: '狮子座',
  //   color: '金黄色',
  //   datetime: '2020年09月10日',
  //   health: '70',
  //   love: '70',
  //   work: '80',
  //   money: '70',
  //   number: 1,
  //   summary: '今天的你乐观又充满自信，你可能想要去玩一下冒险的游戏。如果你为人父母，今天要好好跟孩子交流一番，别看他们是未成年人，但他们的创造力可以算无敌。',
  //   all: '75',
  //   resultcode: '200',
  //   error_code: 0
  // }
  // week: {
  //   name: '处女座',
  //   weekth: 37,
  //   date: '2020年09月06日-2020年09月12日',
  //   health: '',
  //   job: '学业：本周在学习方面有些着急和钻牛角尖，对一些高深的知识理解起来有困难。要记得请教一下周边的人。',
  //   love: '恋爱：本周处女座在感情上飘忽不定，一会儿觉得伴侣好，一会儿又觉得伴侣不好。在感情中很没有耐心，脾气不好，对两人的感情有非常大的影响。部分处女座可能会移情别恋。单身的处女座烂桃花也是接踵而来，要理性对待感情的问题，能舍弃的烂桃花尽量早点舍弃，不然会给自己带来很大的麻烦，也会影响自己的心情。',
  //   money: '财运：本周处女可能会求财不力，有许多陷阱等着你，要时刻小心提防身边人的欺骗。',
  //   work: '工作：本周处女座在工作上会处理许多的琐事，虽然都没有什么难度，但是这些琐碎的事情让你感觉很烦躁，也会轻易把这种情绪影响到身边的人。',
  //   resultcode: '200',
  //   error_code: 0
  // }
  const info = res.data
  return {
    today: info.today,
    week: info.week
  }
}
async function getJoke() {
  // 距离开始多少天，就第多少页
  const days = Math.floor((new Date().getTime() - startTime) / 86400000)
  const res = await axios.get(`http://v.juhe.cn/joke/content/list.php`, {
    params: {
      key: 'd327a5336657df82223909c475660c66',
      page: days + 1,
      pagesize: 1,
      time: moment().toDate().getTime().toString().slice(0,10),
      sort: 'desc'
    }
  })
  const joke = res.data
  return joke.result.data[0].content;
}
async function getLoveTalk() {
  const res = await axios.get(`https://v1.alapi.cn/api/qinghua`)
  return res.data.data.content
}

async function getInfo() {
  const weather = await getWeather()
  const constellation = await getConstellation()
  const joke = await getJoke()
  const loveTalk = await getLoveTalk()
  return {
    weather,
    constellation,
    joke,
    loveTalk
  }
}
module.exports = getInfo