/**
 * 本常量用于表示绘制圆弧时的半径和线宽
 * @type {Object}
 * @property {number} radius 圆的半径
 * @property {number} lineWidth 圆弧的线宽
 * */
const circle = {
    radius: 360,
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
        name: 'F♯m',
        defaultColor: '#f79e6b',
        hoverColor: '#f36f22',
        path: undefined,
    },
    {
        name: 'C♯m',
        defaultColor: '#f1526b',
        hoverColor: '#ec1b3c',
        path: undefined,
    },
    {
        name: 'A♭m/G♯m',
        defaultColor: '#d136ba',
        hoverColor: '#a2258f',
        path: undefined,
    },
    {
        name: 'E♭m/D♯m',
        defaultColor: '#7d43c2',
        hoverColor: '#5c2f91',
        path: undefined,
    },
    {
        name: 'B♭m/A♯m',
        defaultColor: '#408be4',
        hoverColor: '#185baa',
        path: undefined,
    },
    {
        name: 'Fm',
        defaultColor: '#3ba5f1',
        hoverColor: '#0d71b9',
        path: undefined,
    },
    {
        name: 'Cm',
        defaultColor: '#5fe5e8',
        hoverColor: '#19aaad',
        path: undefined,
    },
    {
        name: 'Gm',
        defaultColor: '#6be08b',
        hoverColor: '#25b24b',
        path: undefined,
    },
    {
        name: 'Dm',
        defaultColor: '#cce38e',
        hoverColor: '#a6ce39',
        path: undefined,
    },
    {
        name: 'Am',
        defaultColor: '#fdec95',
        hoverColor: '#fbd307',
        path: undefined,
    },
    {
        name: 'Em',
        defaultColor: '#fdd98b',
        hoverColor: '#fcb51a',
        path: undefined,
    },
    {
        name: 'Bm',
        hoverColor: '#f79321',
        defaultColor: '#faba70',
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
    defaultFillStyle: '#000000',
    hoverFillStyle: '#FFFFFF',
}

const minorCircleConf = {
    circle,
    tonalities,
    font,
}

export default minorCircleConf