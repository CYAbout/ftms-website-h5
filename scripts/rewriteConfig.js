const path = require('path')
const fs = require('fs')
// 生成json文件
const { NODE_ENV } = process.env
let configPath = path.join(path.resolve(__dirname, '../src'), 'config.json')
let jsonData = JSON.parse(fs.readFileSync(configPath, 'utf8'))
const mallServerPath = (NODE_ENV === 'svt' || NODE_ENV === 'test') ? 'https://mall.ftms.devbmsoft.cn/wx' : NODE_ENV === 'production' ? 'https://mall.ftms.com.cn/wx' : '';
Object.assign(jsonData, {
  mallServerPath
})

fs.writeFileSync(configPath, JSON.stringify(jsonData, null, 2))
