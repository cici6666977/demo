const birdDom = document.querySelector('.bird')
const birdStyle = getComputedStyle(birdDom)
const birdWidth = parseFloat(birdStyle.width)
const birdHeight = parseFloat(birdStyle.height)
const birdLeft = parseFloat(birdStyle.left)
const birdTop = parseFloat(birdStyle.top)
const birdXSpeed = 0
const birdYSpeed = 0

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, birdXSpeed, birdYSpeed, birdDom)
        this.g = 1500 //向下的加速度,单位：像素/秒²
        this.maxY = document.querySelector('.game').clientHeight - landHeight - this.height
        this.timer = null //小鸟翅膀煽动的计时器
        this.swingStates = 1 //小鸟煽动翅膀状态
        this.render()

    }

    onMove() {
        //控制坐标范围
        if (this.top < 0) {
            this.top = 0;
        } else if (this.top > this.maxY) {
            this.top = this.maxY;
        }
    }

    move(duration) {
        super.move(duration) //复用父类逻辑
        this.ySpeed += this.g * duration
    }
    jump() {
        //向上跳，直接给一个向上的速度
        this.ySpeed = -450
    }
    startSwing() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            this.swingStates++
                if (this.swingStates === 4) {
                    this.swingStates = 1
                }
            this.render()
        }, 200);
    }
    stopSwing() {
        clearInterval(this.timer)
        this.timer = null
    }
    render() {
        super.render() //复用父类逻辑
        this.dom.className = `bird swing${this.swingStates}`
    }
}