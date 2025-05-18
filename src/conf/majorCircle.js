/**
 * 本常量用于表示绘制圆弧时的半径和线宽
 * @type {Object}
 * @property {number} radius 圆的半径
 * @property {number} lineWidth 圆弧的线宽
 * */
const circle = {
    radius: 400,
    lineWidth: 40,
}

/**
 * 本常量用于表示圆弧相关属性(颜色/鼠标悬停时颜色/起始角度/结束角度)等
 * @type {Array}
 * @property {string} defaultColor 圆弧默认颜色
 * @property {string} hoverColor 鼠标悬停在圆弧上时 圆弧的颜色
 * @property {string} name 圆弧表示的调式名称
 * @property {Path2D|undefined} path 圆弧的路径 该路径由绘制函数负责维护
 * */
const tonalities = [
    {
        name: 'A',
        defaultColor: '#f36f22',
        hoverColor: '#f79e6b',
        path: undefined,
    },
    {
        name: 'E',
        defaultColor: '#ec1b3c',
        hoverColor: '#f1526b',
        path: undefined,
    },
    {
        name: 'C♭/B',
        defaultColor: '#a2258f',
        hoverColor: '#d136ba',
        path: undefined,
    },
    {
        name: 'G♭/F♯',
        defaultColor: '#5c2f91',
        hoverColor: '#7d43c2',
        path: undefined,
    },
    {
        name: 'D♭/C♯',
        defaultColor: '#185baa',
        hoverColor: '#408be4',
        path: undefined,
    },
    {
        name: 'A♭',
        defaultColor: '#0d71b9',
        hoverColor: '#3ba5f1',
        path: undefined,
    },
    {
        name: 'E♭',
        defaultColor: '#19aaad',
        hoverColor: '#5fe5e8',
        path: undefined,
    },
    {
        name: 'B♭',
        defaultColor: '#25b24b',
        hoverColor: '#6be08b',
        path: undefined,
    },
    {
        name: 'F',
        defaultColor: '#a6ce39',
        hoverColor: '#cce38e',
        path: undefined,
    },
    {
        name: 'C',
        defaultColor: '#fbd307',
        hoverColor: '#fdec95',
        path: undefined,
    },
    {
        name: 'G',
        defaultColor: '#fcb51a',
        hoverColor: '#fdd98b',
        path: undefined,
    },
    {
        name: 'D',
        defaultColor: '#f79321',
        hoverColor: '#faba70',
        path: undefined,
    }
]

/**
 * 本常量用于定义绘制文字时的字体配置
 * @type {Object}
 * @property {string} style 字体大小和类型
 * @property {string} textAlign 文字对齐方式
 * @property {string} textBaseline 文字基线对齐方式
 * @property {string} defaultFillStyle 默认文字颜色
 * @property {string} hoverFillStyle 鼠标悬停时文字颜色
 * */
const font = {
    style: '20px Microsoft YaHei',
    textAlign: 'center',
    textBaseline: 'middle',
    defaultFillStyle: '#FFFFFF',
    hoverFillStyle: '#000000',
}

const majorCircleConf = {
    circle,
    tonalities,
    font,
}

export default majorCircleConf