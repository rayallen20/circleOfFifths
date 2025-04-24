/**
 * 本函数用于在圆弧中间位置绘制文字
 * @param {Object} tonality 圆弧表示的调式
 * @param {CanvasRenderingContext2D} ctx canvas的2D上下文对象
 * @param {Object} center 圆心坐标
 * @param {number} radius 圆的半径
 * @param {Object} fontConf 字体配置
 * */
function drawCenteredText(tonality, ctx, center, radius, fontConf) {
    const text = tonality.name
    const chars = text.split('')
    ctx.save()

    // 设置文字样式
    ctx.font = fontConf.font
    ctx.textAlign = fontConf.textAlign
    ctx.textBaseline = fontConf.textBaseline
    if (tonality.isHovering) {
        ctx.fillStyle = fontConf.hoverFillStyle
    } else {
        ctx.fillStyle = fontConf.defaultFillStyle
    }

    // 计算字符串的总宽度
    const totalWidth = ctx.measureText(text).width

    // 将宽度转换为角度
    const totalAngle = totalWidth / radius

    // 计算圆弧起始角度
    const arcMiddleAngle = (tonality.startAngle + tonality.endAngle) / 2

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

export {
    drawCenteredText
}