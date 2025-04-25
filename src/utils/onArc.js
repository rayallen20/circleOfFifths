/**
 * 本函数用于判断鼠标是否在圆上
 * @param {Object} mousePosition 鼠标位置
 *  - {number} x 鼠标相对于canvas的x坐标
 *  - {number} y 鼠标相对于canvas的y坐标
 * @param {Object} center 表示圆心坐标的对象
 *  - {number} x 圆心的x坐标
 *  - {number} y 圆心的y坐标
 * @param {Object} circle 表示圆的对象
 *  - {number} radius 圆的半径
 *  - {number} lineWidth 圆的线宽
 * @return {boolean} 鼠标是否在圆上
 * */
function isOnCircle(mousePosition, center, circle) {
    const differenceX = mousePosition.x - center.x
    const differenceY = mousePosition.y - center.y

    // 计算鼠标位置与圆心的距离
    const distance = Math.sqrt(differenceX * differenceX + differenceY * differenceY)

    // 绘制有线宽的圆时
    // 设置的半径实际上只用于描述路径
    // 设置的线宽是沿着该路径两侧各自延展线宽的1/2
    // 所以绘制出的圆 实际上是有2个半径的
    // 内半径: 半径 - 线宽/2
    // 外半径: 半径 + 线宽/2
    const innerRadius = circle.radius - circle.lineWidth / 2
    const outerRadius = circle.radius + circle.lineWidth / 2

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
 * @param {Object} center 圆心坐标
 * @return {boolean} 鼠标是否在圆弧上
 * */
function isOnArc(mousePosition, tonality, center) {
    const differenceX = mousePosition.x - center.x
    const differenceY = mousePosition.y - center.y

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
    // 再白话一点就是 -1/4π 和 7/4π 是同一个位置
    if (angle < 0) {
        angle += 2 * Math.PI
    }

    if (angle < tonality.startAngle) {
        return false
    }

    return angle <= tonality.endAngle
}

export {
    isOnCircle,
    isOnArc
}