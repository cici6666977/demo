class Game {
    constructor() {
        this.sky = new Sky()
        this.land = new Land(-100)
        this.bird = new Bird()
        this.pipeProducer = new PipePareProducer(-100)

        this.timer = null
        this.tick = 16 //移动时间间隔，毫秒
        this.gameOver = false

    }

    start() {
            if (this.timer) {
                return
            }

            if (this.gameOver) {
                // 重新开始游戏
                window.location.reload()
            }

            this.pipeProducer.startProduce() //开始不断生成水管对
            this.bird.startSwing()
            this.timer = setInterval(() => {
                const duration = this.tick / 1000
                this.sky.move(duration)
                this.land.move(duration)
                this.bird.move(duration)
                this.pipeProducer.pairs.forEach(pair => {
                    pair.move(duration)
                })

                if (this.isGameOver()) {
                    this.stop()
                    this.gameOver = true
                }



            }, this.tick);
        }
        /**
         * 判断两个矩形是否碰撞
         * @param {*} rec1 
         * @param {*} rec2 
         */
    isHit(rec1, rec2) {
        // 横向：两个矩形的中心的横向距离，是否等于宽度之和的一半
        // 纵向：两个矩形的中心的纵向距离，是否等于高度之和的一半

        const centerX1 = rec1.left + rec1.width / 2
        const centerY1 = rec1.top + rec1.height / 2
        const centerX2 = rec2.left + rec2.width / 2
        const centerY2 = rec2.top + rec2.height / 2
        const disX = Math.abs(centerX1 - centerX2)
        const disY = Math.abs(centerY1 - centerY2)


        return disX <= (rec1.width + rec2.width) / 2 && disY <= (rec1.height + rec2.height) / 2

    }

    isGameOver() {
        // 鸟碰到大地 游戏结束
        if (this.bird.top === this.bird.maxY) {
            return true
        }

        // 鸟碰到水管 游戏结束

        for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
            const pair = this.pipeProducer.pairs[i]
            if (this.isHit(pair.upPipe, this.bird) ||
                this.isHit(pair.downPipe, this.bird)) {
                return true
            }

        }
        return false

    }

    stop() {
        clearInterval(this.timer)
        this.timer = null
        this.bird.stopSwing()
        this.pipeProducer.stopProduce()
    }

    /**
     *关联键盘事件
     * @memberof Game
     */
    regEvent() {
        window.onkeydown = e => {
            if (e.key === 'Enter') {
                if (this.timer) {
                    this.stop()
                } else {
                    this.start()
                }
            } else if (e.key === ' ') {
                this.bird.jump()

            }
        }
    }
}

const g = new Game()
g.regEvent()