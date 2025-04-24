<template>
    <div class="major-circle"></div>
</template>

<script setup>
import {inject} from "vue"
import {isOnCircle, isOnArc} from "@/utils/onArc"
import {drawCenteredText} from "@/utils/drawFont"

// eslint-disable-next-line
defineOptions({
    name: 'MajorCircle',
})

const canvasRef = inject("canvasRef")

const canvasCtx = inject('canvasCtx')

const circleCenter = inject('circleCenter')

/**
 * 本常量用于表示绘制圆弧时的半径和线宽
 * @type {Object}
 * @property {number} radius 圆的半径
 * @property {number} lineWidth 圆弧的线宽
 * */
const circle = {
    radius: 300,
    lineWidth: 40,
}
canvasCtx.value.lineWidth = circle.lineWidth

/**
 * 本常量用于表示圆弧相关属性(颜色/鼠标悬停时颜色/起始角度/结束角度)等
 * @type {Object}
 * Tips: 西方音乐称呼调式使用的单词为key
 * Tips: 但是在编程领域,key是一个非常常见的单词,所以这里使用tonality来指代调式 使用tonalities指代调式集合
 * Tips: 实际上tonality表示的是音乐整体的调性系统(可以理解为一首音乐的调性归属,例如major tonality/minor tonality)
 * @property {Object} A 定义A大调与圆弧相关的属性
 * @property {number} A.startAngle 圆弧起始角度
 * @property {number} A.endAngle 圆弧结束角度
 * @property {string} A.defaultColor 圆弧默认颜色
 * @property {string} A.hoverColor 鼠标悬停在圆弧上时 圆弧的颜色
 * @property {boolean} A.isHovering 鼠标是否悬停在圆弧上
 * @property {string} A.name 圆弧表示的调式名称
 * */
const tonalities = {
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
}

/**
 * 本常量用于定义绘制文字时的字体配置
 * @type {Object}
 * @property {string} font 字体大小和类型
 * @property {string} textAlign 文字对齐方式
 * @property {string} textBaseline 文字基线对齐方式
 * @property {string} defaultFillStyle 默认文字颜色
 * @property {string} hoverFillStyle 鼠标悬停时文字颜色
 * */
const fontConf = {
    font: '20px Microsoft YaHei',
    textAlign: 'center',
    textBaseline: 'middle',
    defaultFillStyle: '#FFFFFF',
    hoverFillStyle: '#000000',
}

const draw = () => {
    for (const key in tonalities) {
        const tonality = tonalities[key]
        drawArc(tonality)
    }
}

/**
 * 本函数用于绘制圆弧
 * @param {Object} tonality 圆弧表示的调式
 * @return {void}
 * */
const drawArc = (tonality) => {
    canvasCtx.value.beginPath()
    canvasCtx.value.arc(
        circleCenter.x,
        circleCenter.y,
        circle.radius,
        tonality.startAngle,
        tonality.endAngle
    )

    if (tonality.isHovering) {
        canvasCtx.value.strokeStyle = tonality.hoverColor
    } else {
        canvasCtx.value.strokeStyle = tonality.defaultColor
    }

    canvasCtx.value.stroke()
    drawCenteredText(tonality, canvasCtx.value, circleCenter, circle.radius, fontConf)
    canvasCtx.value.closePath()
}

/**
 * 本函数用于当鼠标悬停在圆弧时 重新渲染整个canvas
 * @param {MouseEvent} event
 * */
const reDraw = (event) => {
    const canvasDistanceRect = canvasRef.value.getBoundingClientRect()

    // 获取鼠标相对于canvas的坐标
    const relativeX = event.clientX - canvasDistanceRect.left
    const relativeY = event.clientY - canvasDistanceRect.top

    const mousePosition = {
        x: relativeX,
        y: relativeY,
    }

    for (const key in tonalities) {
        const tonality = tonalities[key]

        const onCircle = isOnCircle(mousePosition, circleCenter, circle)
        const onArc = isOnArc(mousePosition, tonality, circleCenter)

        const prevHoverStatus = tonality.isHovering
        const currentHoverStatus = onCircle && onArc

        // 仅当悬停状态发生变化时 重新渲染画布
        if (prevHoverStatus !== currentHoverStatus) {
            tonalities[key].isHovering = currentHoverStatus
            draw()
            return
        }
    }
}

draw()
canvasRef.value.addEventListener('mousemove', reDraw)
</script>