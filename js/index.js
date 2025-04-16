/**
 * 本变量用于标记浏览器是否支持canvas
 * */
let canvasAvailable = true

/**
 * 本常量用于表示canvas元素
 * */
const canvasEle = document.querySelector('.circle')

/**
 * 本常量用于表示canvas的上下文
 * */
const canvasCtx = canvasEle.getContext('2d')

/**
 * 本常量用于表示canvas的缓冲区
 * */
const bufferArea = {
    width: 1000,
    height: 800,
}

/**
 * 本常量用于表示绘制圆弧时的圆心和半径
 * */
const circle = {
    center: {
        x: bufferArea.width / 2,
        y: bufferArea.height / 2,
    },
    radius: 300
}

/**
 * 本常量用于表示圆弧相关属性(线宽/颜色/起始角度/结束角度)等
 * */
const arc = {
    lineWidth: 10,
    C: {
        startAngle: 1.5 * Math.PI,
        endAngle: 1.5 * Math.PI + Math.PI / 6,
        defaultColor: 'skyblue',
        hoverColor: 'pink',
        isHovering: false,
    }
}

/**
 * 本函数用于初始化工作
 *      1. 检测浏览器是否支持canvas
 *      2. 设置canvas的缓冲区尺寸(画布宽高)
 * */
function init() {
    if (canvasEle.getContext === undefined) {
        alert('浏览器不支持canvas')
        canvasAvailable = false
        return
    }

    canvasEle.width = bufferArea.width
    canvasEle.height = bufferArea.height
}

function drawArc(startAngle, endAngle, color) {
    canvasCtx.beginPath()
    canvasCtx.arc(circle.center.x, circle.center.y, circle.radius, startAngle, endAngle)
    canvasCtx.lineWidth = arc.lineWidth
    canvasCtx.strokeStyle = color
    canvasCtx.stroke()
    canvasCtx.closePath()
}

/**
 * 本函数用于判断鼠标是否在圆上
 * @param {Object} mousePosition 鼠标位置
 *  - {number} x 鼠标相对于canvas的x坐标
 *  - {number} y 鼠标相对于canvas的y坐标
 *  @returns {boolean} 鼠标是否在圆上
 * */
function isOnCircle(mousePosition) {
    const differenceX = mousePosition.x - circle.center.x
    const differenceY = mousePosition.y - circle.center.y

    // 计算鼠标位置与圆心的距离
    const distance = Math.sqrt(differenceX * differenceX + differenceY * differenceY)

    // 绘制有线宽的圆时
    // 设置的半径实际上只用于描述路径
    // 设置的线宽是沿着该路径两侧各自延展线宽的1/2
    // 所以绘制出的圆 实际上是有2个半径的
    // 内半径: 半径 - 线宽/2
    // 外半径: 半径 + 线宽/2
    const innerRadius = circle.radius - arc.lineWidth / 2
    const outerRadius = circle.radius + arc.lineWidth / 2

    if (distance < innerRadius) {
        return false
    }

    return distance <= outerRadius
}

/**
 * 本方法用于判断鼠标是否在圆弧上
 * @params {Object} mousePosition 鼠标位置
 * - {number} x 鼠标相对于canvas的x坐标
 * - {number} y 鼠标相对于canvas的y坐标
 * @return {boolean} 鼠标是否在圆弧上
 * */
function isOnArc(mousePosition, arc) {
    const differenceX = mousePosition.x - circle.center.x
    const differenceY = mousePosition.y - circle.center.y

    // 从几何学的角度上讲 这里算出来的角度 实际上是:
    // 点1: 鼠标悬停位置
    // 点2: 圆心
    // 这两个点构成的直线的斜率
    // 但这个斜率的角度是相对于x轴正方向的
    let angle = Math.atan2(differenceY, differenceX)

    if (angle < 0) {
        // 这里+2π的原因: Math.atan2()方法返回的角度范围是[-π, π]
        // 而画圆时的角度范围是[0, 2π]
        // 所以需要将负角度转换为正角度
        // 白话讲就是让负角度顺时针转一圈
        // 再白话一点就是 -1/4π 和 7/4π 是同一个角度
        angle += 2 * Math.PI
    }

    if (angle < arc.startAngle) {
        return false
    }

    return angle <= arc.endAngle
}

init()

if (canvasAvailable) {
    drawArc(arc.C.startAngle, arc.C.endAngle, arc.C.defaultColor)
    canvasEle.addEventListener('mousemove', (e) => {
        const canvasDistanceRect = canvasEle.getBoundingClientRect()

        // 获取鼠标相对于canvas的坐标
        const mouseRelativeX = e.clientX - canvasDistanceRect.left
        const mouseRelativeY = e.clientY - canvasDistanceRect.top

        const mousePosition = {
            x: mouseRelativeX,
            y: mouseRelativeY,
        }

        if (!isOnCircle(mousePosition)) {
            arc.C.isHovering = false
            drawArc(arc.C.startAngle, arc.C.endAngle, arc.C.defaultColor)
            return
        }

        if (!isOnArc(mousePosition, arc.C)) {
            arc.C.isHovering = false
            drawArc(arc.C.startAngle, arc.C.endAngle, arc.C.defaultColor)
            return
        }

        if (!arc.C.isHovering) {
            arc.C.isHovering = true
            // canvasCtx.clearRect(0, 0, bufferArea.width, bufferArea.height)
            drawArc(arc.C.startAngle, arc.C.endAngle, arc.C.hoverColor)
        }
    })
}