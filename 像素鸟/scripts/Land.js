const landDom = document.querySelector('.land')
const landStyle = getComputedStyle(landDom)
const landWidth = parseFloat(landStyle.width)
const landHeight = parseFloat(landStyle.height)
const landLeft = parseFloat(landStyle.left)
const landTop = parseFloat(landStyle.top)
    // const landXSpeed = -100
const landYSpeed = 0

class Land extends Rectangle {
    constructor(landXSpeed) {
        super(landWidth, landHeight, landLeft, landTop, landXSpeed, landYSpeed, landDom)
    }
    onMove() {
        (this.left <= -(landWidth / 2)) && (this.left = 0)
    }
}