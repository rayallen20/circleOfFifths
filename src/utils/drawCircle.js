/**
 * 本函数用于绘制圆形
 * @param {HTMLCanvasElement} canvasEle
 * @param {Object} center
 * @param {Array} arcs
 * @param {Array} circleConf
 * */
function drawCircle(canvasEle, center, arcs, circleConf) {
    const canvasCtx = canvasEle.getContext('2d')
    canvasCtx.clearRect(0, 0, canvasEle.width, canvasEle.height)

    circleConf.forEach(conf => draw(canvasCtx, center, arcs, conf))
}

/**
 * 本函数用于绘制圆弧
 * @param {CanvasRenderingContext2D} canvasCtx canvas的2D上下文对象
 * @param {Object} center 圆心坐标
 * @param {Array} arcs 圆弧数组
 * @param {Object} conf 圆弧配置
 * */
function draw(canvasCtx, center, arcs, conf) {
    canvasCtx.lineWidth = conf.circle.lineWidth

    arcs.forEach((arc, index) => {
        const tonality = conf.tonalities[index]
        tonality.path = new Path2D()
        tonality.path.arc(center.x, center.y, conf.circle.radius, arc.startAngle, arc.endAngle)

        canvasCtx.strokeStyle = tonality.defaultColor
        if (arc.isHovering) {
            canvasCtx.strokeStyle = tonality.hoverColor
        }

        canvasCtx.stroke(tonality.path)
        centeredText(tonality.name, arc, canvasCtx, center, conf.circle.radius, conf.font)
    })
}

/**
 * 本函数用于在圆弧中间位置绘制文字
 * @param {String} text
 * @param {Object} arc
 * @param {CanvasRenderingContext2D} ctx canvas的2D上下文对象
 * @param {Object} center 圆心坐标
 * @param {number} radius 圆的半径
 * @param {Object} fontConf 字体配置
 * */
function centeredText(text, arc, ctx, center, radius, fontConf) {
    const chars = text.split('')

    ctx.save()

    // 设置文字样式
    ctx.font = fontConf.style
    ctx.textAlign = fontConf.textAlign
    ctx.textBaseline = fontConf.textBaseline
    ctx.fillStyle = fontConf.defaultFillStyle
    if (arc.isHovering) {
        ctx.fillStyle = fontConf.hoverFillStyle
    }

    // 计算字符串的总宽度
    const totalWidth = ctx.measureText(text).width

    // 将宽度转换为角度
    const totalAngle = totalWidth / radius

    // 计算圆弧中心角度
    const arcMiddleAngle = (arc.startAngle + arc.endAngle) / 2

    // 计算每个字符的位置
    let currentAngle = arcMiddleAngle - totalAngle / 2

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i]
        const charWidth = ctx.measureText(char).width
        const charAngle = charWidth / radius

        // 当前字符的中心角度
        const charCenterAngle = currentAngle + charAngle / 2

        // 字符坐标
        const charX = center.x + radius * Math.cos(charCenterAngle)
        const charY = center.y + radius * Math.sin(charCenterAngle)

        // 绘制字符
        ctx.save()
        ctx.translate(charX, charY)
        ctx.rotate(charCenterAngle + Math.PI / 2) // 旋转画布 实际上是为了达到旋转字符的目的
        ctx.fillText(char, 0, 0)
        ctx.restore()

        // 更新角度
        currentAngle += charAngle
    }

    ctx.restore()
}

export default drawCircle