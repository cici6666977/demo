/**
 * 矩形类，可以移动
 * 属性： 宽度 高度 横坐标 纵坐标 横向速度 纵向速度 dom对象
 * @class Rectangle
 */
class Rectangle {
    /**
     * Creates an instance of Rectangle.
     * @param {*} width
     * @param {*} height
     * @param {*} left
     * @param {*} top
     * @param {*} xSpeed 横向速度 单位(像素/毫秒) 负数向左 正数向右
     * @param {*} ySpeed 纵向速度 单位(像素/毫秒) 负数向上 正数向下
     * @param {*} dom
     * @memberof Rectangle
     */
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width
        this.height = height
        this.left = left
        this.top = top
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
        this.dom = dom

        this.render()
    }

    /**
     *渲染
     *
     * @memberof Rectangle
     */
    render() {
            this.dom.style.width = this.width + 'px'
            this.dom.style.height = this.height + 'px'
            this.dom.style.left = this.left + 'px'
            this.dom.style.top = this.top + 'px'
        }
        /**
         *移动
         *
         * @param {*} duration 单位秒
         * @memberof Rectangle
         */
    move(duration) {
        const xDis = this.xSpeed * duration
        const yDis = this.ySpeed * duration
            // 重新给坐标赋值
        this.left = this.left + xDis
        this.top = this.top + yDis
        if (this.onMove) {
            // 重新渲染之前，如果有onMove,则调用
            this.onMove()

        }

        // 重新渲染
        this.render()
    }
}