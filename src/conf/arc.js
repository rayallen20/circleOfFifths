/**
 * 本常量文件定义了一个圆形的12个圆弧的起始角度 结束角度 悬停状态
 * @type {Array}
 * @property {number} startAngle 圆弧的起始角度
 * @property {number} endAngle 圆弧的结束角度
 * @property {boolean} isHovering 圆弧是否处于悬停状态
 * */
const arcs = [
    {
        startAngle: 0,
        endAngle: Math.PI / 6,
        isHovering: false,
    },
    {
        startAngle: Math.PI / 6,
        endAngle: Math.PI / 6 * 2,
        isHovering: false,
    },
    {
        startAngle: Math.PI / 6 * 2,
        endAngle: Math.PI / 6 * 3,
        isHovering: false,
    },
    {
        startAngle: Math.PI / 6 * 3,
        endAngle: Math.PI / 6 * 4,
        isHovering: false,
    },
    {
        startAngle: Math.PI / 6 * 4,
        endAngle: Math.PI / 6 * 5,
        isHovering: false,
    },
    {
        startAngle: Math.PI / 6 * 5,
        endAngle: Math.PI,
        isHovering: false,
    },
    {
        startAngle: Math.PI,
        endAngle: Math.PI / 6 * 7,
        isHovering: false,
    },
    {
        startAngle: Math.PI / 6 * 7,
        endAngle: Math.PI / 6 * 8,
        isHovering: false,
    },
    {
        startAngle: Math.PI / 6 * 8,
        endAngle: Math.PI / 6 * 9,
        isHovering: false,
    },
    {
        startAngle: Math.PI / 6 * 9,
        endAngle: Math.PI / 6 * 10,
        isHovering: false,
    },
    {
        startAngle: Math.PI / 6 * 10,
        endAngle: Math.PI / 6 * 11,
        isHovering: false,
    },
    {
        startAngle: Math.PI / 6 * 11,
        endAngle: Math.PI * 2,
        isHovering: false,
    },
]

export default arcs