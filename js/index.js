/**
 * 本变量用于标记浏览器是否支持canvas
 * */
let canvasAvailable = true

/**
 * 本常量用于表示canvas元素
 * @type {HTMLCanvasElement}
 * */
const canvasEle = document.querySelector('.circle')

/**
 * 本常量用于表示canvas的上下文
 * @type {CanvasRenderingContext2D}
 * */
const canvasCtx = canvasEle.getContext('2d')

/**
 * 本常量用于表示canvas的缓冲区宽高
 * @type {Object}
 * @property {number} width 缓冲区宽度
 * @property {number} height 缓冲区高度
 * */
const bufferArea = {
    width: 1000,
    height: 800,
}

/**
 * 本常量用于表示绘制圆弧时的圆心和半径
 * @type {Object}
 * @property {Object} center 圆心坐标
 * @property {number} center.x 圆心的x坐标
 * @property {number} center.y 圆心的y坐标
 * @property {number} radius 圆的半径
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
 * @type {Object}
 * @property {number} lineWidth 圆弧线宽
 * @property {Object} tonalities 调式集合
 *      Tips: 西方音乐称呼调式使用的单词为key
 *      Tips: 但是在编程领域,key是一个非常常见的单词,所以这里使用tonality来指代调式 使用tonalities指代调式集合
 *      Tips: 实际上tonality表示的是音乐整体的调性系统(可以理解为一首音乐的调性归属,例如major tonality/minor tonality)
 * @property {Object} tonalities.C 定义C大调与圆弧相关的属性
 * @property {number} tonalities.C.startAngle 圆弧起始角度
 * @property {number} tonalities.C.endAngle 圆弧结束角度
 * @property {string} tonalities.C.defaultColor 圆弧默认颜色
 * @property {string} tonalities.C.hoverColor 鼠标悬停在圆弧上时 圆弧的颜色
 * @property {boolean} tonalities.C.isHovering 鼠标是否悬停在圆弧上
 * @property {string} tonalities.C.name 圆弧表示的调式名称
 * */
const arc = {
    lineWidth: 40,
    tonalities: {
        A: {
            // 从0度开始 每个弧度为60度
            startAngle: 0,
            endAngle: Math.PI / 6,
            defaultColor: '#f36f22',
            hoverColor: '#f79e6b',
            isHovering: false,
            name: 'A'
        },
        E: {
            startAngle: Math.PI / 6,
            endAngle: Math.PI / 6 * 2,
            defaultColor: '#ec1b3c',
            hoverColor: '#f1526b',
            isHovering: false,
            name: 'E'
        },
        B: {
            startAngle: Math.PI / 6 * 2,
            endAngle: Math.PI / 6 * 3,
            defaultColor: '#a2258f',
            hoverColor: '#d136ba',
            isHovering: false,
            name: 'C♭/B'
        },
        FSharp: {
            startAngle: Math.PI / 6 * 3,
            endAngle: Math.PI / 6 * 4,
            defaultColor: '#5c2f91',
            hoverColor: '#7d43c2',
            isHovering: false,
            name: 'G♭/F♯'
        },
        DFlat: {
            startAngle: Math.PI / 6 * 4,
            endAngle: Math.PI / 6 * 5,
            defaultColor: '#185baa',
            hoverColor: '#408be4',
            isHovering: false,
            name: 'D♭/C♯'
        },
        AFlat: {
            startAngle: Math.PI / 6 * 5,
            endAngle: Math.PI,
            defaultColor: '#0d71b9',
            hoverColor: '#3ba5f1',
            isHovering: false,
            name: 'A♭'
        },
        EFlat: {
            startAngle: Math.PI,
            endAngle: Math.PI / 6 * 7,
            defaultColor: '#19aaad',
            hoverColor: '#5fe5e8',
            isHovering: false,
            name: 'E♭'
        },
        BFlat: {
            startAngle: Math.PI / 6 * 7,
            endAngle: Math.PI / 6 * 8,
            defaultColor: '#25b24b',
            hoverColor: '#6be08b',
            isHovering: false,
            name: 'B♭'
        },
        F: {
            startAngle: Math.PI / 6 * 8,
            endAngle: Math.PI / 6 * 9,
            defaultColor: '#a6ce39',
            hoverColor: '#cce38e',
            isHovering: false,
            name: 'F'
        },
        C: {
            startAngle: Math.PI / 6 * 9,
            endAngle: Math.PI / 6 * 10,
            defaultColor: '#fbd307',
            hoverColor: '#fdec95',
            isHovering: false,
            name: 'C'
        },
        G: {
            startAngle: Math.PI / 6 * 10,
            endAngle: Math.PI / 6 * 11,
            defaultColor: '#fcb51a',
            hoverColor: '#fdd98b',
            isHovering: false,
            name: 'G'
        },
        D: {
            startAngle: Math.PI / 6 * 11,
            endAngle: Math.PI * 2,
            defaultColor: '#f79321',
            hoverColor: '#faba70',
            isHovering: false,
            name: 'D'
        },
    },
}

/**
 * 本常量用于定义绘制文字时的字体配置
 * @type {Object}
 * @property {string} font 字体大小和类型
 * @property {string} textAlign 文字对齐方式
 * @property {string} textBaseline 文字基线对齐方式
 * @property {string} fillStyle 文字颜色
 * */
const fontConf = {
    font: '20px Arial',
    textAlign: 'center',
    textBaseline: 'middle',
    fillStyle: '#FFFFFF',
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

/**
 * 本函数用于绘制五度圈
 * */
function drawCircle() {
    for (const key in arc.tonalities) {
        const tonality = arc.tonalities[key]
        drawArc(tonality)
    }
}

/**
 * 本函数用于绘制圆弧
 * @param {Object} tonality 圆弧表示的调式
 * @return {void}
 * */
function drawArc(tonality) {
    canvasCtx.beginPath()
    canvasCtx.arc(circle.center.x, circle.center.y, circle.radius, tonality.startAngle, tonality.endAngle)
    canvasCtx.lineWidth = arc.lineWidth
    if (tonality.isHovering) {
        canvasCtx.strokeStyle = tonality.hoverColor
    } else {
        canvasCtx.strokeStyle = tonality.defaultColor
    }
    canvasCtx.stroke()
    drawCenteredText(tonality)
    canvasCtx.closePath()
}

/**
 * 本函数用于在圆弧中间位置绘制文字
 * @param {Object} tonality 圆弧表示的调式
 * */
function drawCenteredText(tonality) {
    const text = tonality.name
    const chars = text.split('')
    canvasCtx.save()

    // 设置文字样式
    canvasCtx.font = fontConf.font
    canvasCtx.textAlign = fontConf.textAlign
    canvasCtx.textBaseline = fontConf.textBaseline
    canvasCtx.fillStyle = fontConf.fillStyle

    // 计算字符串的总宽度
    const totalWidth = canvasCtx.measureText(text).width

    // 将宽度转换为角度
    const totalAngle = totalWidth / circle.radius

    // 计算起始角度
    const arcMiddleAngle = (tonality.startAngle + tonality.endAngle) / 2

    // 计算每个字符的位置
    let currentAngle = arcMiddleAngle - totalAngle / 2
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i]
        const charWidth = canvasCtx.measureText(char).width
        const charAngle = charWidth / circle.radius

        // 当前字符的中心角度
        const charCenterAngle = currentAngle + charAngle / 2

        // 字符坐标
        const charX = circle.center.x + circle.radius * Math.cos(charCenterAngle)
        const charY = circle.center.y + circle.radius * Math.sin(charCenterAngle)

        // 绘制字符
        canvasCtx.save()
        canvasCtx.translate(charX, charY)
        canvasCtx.rotate(charCenterAngle + Math.PI / 2) // 旋转画布 实际上是为了达到旋转字符的目的
        canvasCtx.fillText(char, 0, 0)
        canvasCtx.restore()

        // 更新角度
        currentAngle += charAngle
    }

    canvasCtx.restore()
}

/**
 * 本函数用于判断鼠标是否在圆上
 * @param {Object} mousePosition 鼠标位置
 *  - {number} x 鼠标相对于canvas的x坐标
 *  - {number} y 鼠标相对于canvas的y坐标
 *  @return {boolean} 鼠标是否在圆上
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
 * @param {Object} mousePosition 鼠标位置
 * - {number} x 鼠标相对于canvas的x坐标
 * - {number} y 鼠标相对于canvas的y坐标
 * @param {Object} tonality 圆弧表示的调式
 * @return {boolean} 鼠标是否在圆弧上
 * */
function isOnArc(mousePosition, tonality) {
    const differenceX = mousePosition.x - circle.center.x
    const differenceY = mousePosition.y - circle.center.y

    // 从几何学的角度上讲 这里算出来的角度 实际上是:
    // 点1: 鼠标悬停位置
    // 点2: 圆心
    // 这两个点构成的直线的斜率
    // 但这个斜率的角度是相对于x轴正方向的
    let angle = Math.atan2(differenceY, differenceX)

    // 这里+2π的原因: Math.atan2()方法返回的角度范围是[-π, π]
    // 而画圆时的角度范围是[0, 2π]
    // 所以需要将负角度转换为正角度
    // 白话讲就是让负角度顺时针转一圈
    // 再白话一点就是 -1/4π 和 7/4π 是同一个角度
    if (angle < 0) {
        angle += 2 * Math.PI
    }

    if (angle < tonality.startAngle) {
        return false
    }

    return angle <= tonality.endAngle
}

/**
 * 本函数用于渲染鼠标悬停在圆弧时的效果
 * @param {MouseEvent} event
 * */
function hoverArcHandle(event) {
    const canvasDistanceRect = canvasEle.getBoundingClientRect()

    // 获取鼠标相对于canvas的坐标
    const mouseRelativeX = event.clientX - canvasDistanceRect.left
    const mouseRelativeY = event.clientY - canvasDistanceRect.top

    const mousePosition = {
        x: mouseRelativeX,
        y: mouseRelativeY,
    }

    reDrawCircle(mousePosition)
}

/**
 * 本函数用于重绘五度圈
 * @param {Object} mousePosition 鼠标位置
 * */
function reDrawCircle(mousePosition) {
    for (const key in arc.tonalities) {
        const tonality = arc.tonalities[key]
        reDrawArc(mousePosition, tonality)
    }
}

/**
 * 本函数用于重新绘制圆弧
 * @param {Object} mousePosition 鼠标位置
 * @param {Object} tonality 圆弧表示的调式
 * */
function reDrawArc(mousePosition, tonality) {
    if (!isOnCircle(mousePosition)) {
        tonality.isHovering = false
        fontConf.fillStyle = '#FFFFFF'
        drawArc(tonality)
        return
    }

    if (!isOnArc(mousePosition, tonality)) {
        tonality.isHovering = false
        fontConf.fillStyle = '#FFFFFF'
        drawArc(tonality)
        return
    }

    if (!tonality.isHovering) {
        tonality.isHovering = true
        fontConf.fillStyle = '#000000'
        drawArc(tonality)
    }
}

init()

if (canvasAvailable) {
    drawCircle()
    canvasEle.addEventListener('mousemove', hoverArcHandle)
}