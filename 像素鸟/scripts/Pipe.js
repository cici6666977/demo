const pipeWidth = 52
const pipeLeft = document.querySelector('.game').clientWidth
    // const pipeXSpeed = 50
const pipeYSpeed = 0

// 水管类
class Pipe extends Rectangle {
    constructor(pipeHeight, pipeTop, pipeXSpeed, pipeDom) {
        super(pipeWidth, pipeHeight, pipeLeft, pipeTop, pipeXSpeed, pipeYSpeed, pipeDom)
    }

    onMove() {
        this.left < -this.width && this.dom.remove()
    }
}

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)

// 水管对类
class PipePare {
    constructor(speed) {
        this.spaceHeight = 150; //两根水管之间的高度
        this.minPipeHeight = 80; //水管最小高度
        this.maxPipeHeight = landTop - this.spaceHeight - this.minPipeHeight //水管最大高度

        //上水管
        const upPipeDom = document.createElement('div')
        const upPipeHeight = getRandom(this.minPipeHeight, this.maxPipeHeight)
        this.upPipe = new Pipe(upPipeHeight, 0, speed, upPipeDom)


        upPipeDom.className = `pipe up`

        // 下水管
        const downPipeDom = document.createElement('div')
        const downPipeHeight = landTop - this.spaceHeight - upPipeHeight
        const downPipeTop = landTop - downPipeHeight
        this.downPipe = new Pipe(downPipeHeight, downPipeTop, speed, downPipeDom)
        downPipeDom.className = `pipe down`

        // 加进游戏dom
        const gameDom = document.querySelector('.game')
        gameDom.appendChild(upPipeDom)
        gameDom.appendChild(downPipeDom)
    }

    // 该水管对是否移出了视野
    get useLess() {
        return this.upPipe.left < -this.upPipe.width
    }

    // 移动柱子
    move(duration) {
        this.upPipe.move(duration)
        this.downPipe.move(duration)
    }
}

// 产生水管对类
class PipePareProducer {
    constructor(speed) {
        this.speed = speed
        this.pairs = [] //用来存放生成的水管对
        this.timer = null
        this.tick = 1700 //产生水管对的间隔时间
    }

    // 开始产生水管对
    startProduce() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed))

            for (const i in this.pairs) {
                if (this.pairs[i].useLess) {
                    // 没用的水管对
                    this.pairs.splice(i, 1)
                }
            }
        }, this.tick);
    }

    stopProduce() {
        clearInterval(this.timer)
        this.timer = null
    }
}