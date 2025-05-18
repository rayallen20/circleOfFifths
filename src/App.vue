<template>
    <div id="app">
        <canvas class="circle"></canvas>
        <MusicalStaff v-if="canvasCtx !== null" :canvas-ctx="canvasCtx" :circle-center="center"></MusicalStaff>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import majorCircleConf from "@/conf/majorCircle"
import arcs from "@/conf/arc"
import drawCircle from "@/utils/drawCircle"
import minorCircleConf from "@/conf/minorCircle"
import findToneMask from "@/conf/staff"
import MusicalStaff from "@/components/MusicalStaff.vue"
import emitter from "@/utils/eventBus";

// eslint-disable-next-line
defineOptions({
    name: 'App'
})

/**
 * 本常量用于表示canvas的缓冲区宽高
 * @type {Object}
 * @property {number} width 缓冲区宽度
 * @property {number} height 缓冲区高度
 * */
const bufferArea = {
    width: 1400,
    height: 1200,
}

/**
 * 本常量用于表示绘制圆弧时的圆心
 * @type {Object}
 * @property {number} x 圆心的x坐标
 * @property {number} y 圆心的y坐标
 * */
const center = {
    x: bufferArea.width / 2,
    y: bufferArea.height / 2,
}


const majorConf = majorCircleConf
const minorConf = minorCircleConf
const arcsConf = arcs

const circleConf = [
    majorConf,
    minorConf
]

const canvasCtx = ref(null)

onMounted(() => {
    const canvasEle = document.querySelector('canvas')
    canvasCtx.value = canvasEle.getContext('2d')

    canvasEle.width = bufferArea.width
    canvasEle.height = bufferArea.height

    drawCircle(canvasEle, center, arcsConf, circleConf)

    canvasEle.addEventListener('mousemove', reDraw)
})

const reDraw = (event) => {
    const canvasEle = event.target
    const canvasRect = canvasEle.getBoundingClientRect()
    const canvasCtx = canvasEle.getContext('2d')

    const relativeX = event.clientX - canvasRect.left
    const relativeY = event.clientY - canvasRect.top

    let needReDraw = false
    let toneMask = undefined

    for (let i = 0; i < arcsConf.length; i++) {
        const arc = arcsConf[i]

        const prevHovering = arc.isHovering

        const paths = []
        for (let j = 0; j < circleConf.length; j++) {
            const path = circleConf[j].tonalities[i].path
            paths.push(path)
        }

        const currentHovering = isOnPaths(canvasCtx, paths, relativeX, relativeY)
        arc.isHovering = currentHovering

        if (arc.isHovering) {
            toneMask = findToneMask(i)
        }

        if (prevHovering !== currentHovering) {
            needReDraw = true
            break
        }
    }

    if (needReDraw) {
        drawCircle(canvasEle, center, arcsConf, circleConf)
    }

    if (toneMask !== undefined) {
        emitter.emit('hoveringTonality', toneMask)
    }
}

const isOnPaths = (canvasCtx, paths, relativeX, relativeY) => {
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i]
        if (canvasCtx.isPointInStroke(path, relativeX, relativeY)) {
            return true
        }
    }
    return false
}

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.circle {
    /*canvas默认是行内块元素 将其转换为块元素 使左右外边距生效*/
    display: block;
    margin: 100px auto;
    width: 1400px;
    height: 1200px;
    border: 1px solid #000;
}
</style>