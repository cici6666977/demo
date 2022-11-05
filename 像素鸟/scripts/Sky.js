const skyDom = document.querySelector('.sky')
const skyStyle = getComputedStyle(skyDom)
const skyWidth = parseFloat(skyStyle.width)
const skyHeight = parseFloat(skyStyle.height)
const skyLeft = parseFloat(skyStyle.left)
const skyTop = parseFloat(skyStyle.top)
const skyXSpeed = -50
const skyYSpeed = 0

class Sky extends Rectangle {
    constructor() {
        super(skyWidth, skyHeight, skyLeft, skyTop, skyXSpeed, skyYSpeed, skyDom)
    }

    onMove() {
        // 当天空left小于负天空宽度的一半时，将天空left设置为0

        // if (this.left <= -(skyWidth / 2)) {
        //     this.left = 0
        // }

        (this.left <= -(skyWidth / 2)) && (this.left = 0)

    }
}