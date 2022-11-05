/**
 * 运行该函数，会逐字打印config.js中的文本
 * 每个字之间的间隔在config.js已有配置
 */
const { wordDuration, text } = require('./config')
const delay = require('./delay')
const print = require('./print')

async function run() {

    let i = 0
    while (i < text.length) {
        print(i)
        await delay(wordDuration)
        i++
    }

}

run();