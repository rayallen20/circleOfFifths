<template>
    <div id="app">
        <canvas class="circle" ref="canvasRef"></canvas>
        <MajorCircle v-if="canvasRef !== null"></MajorCircle>
    </div>
</template>

<script setup>
import {provide, reactive, readonly, ref, watchPostEffect} from "vue"
import MajorCircle from "@/components/MajorCircle.vue"

// eslint-disable-next-line
defineOptions({
    name: 'App'
})

const canvasRef = ref(null)
provide("canvasRef", canvasRef)

const canvasCtx = ref(null)
provide('canvasCtx', canvasCtx)

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
 * 本常量用于表示绘制圆弧时的圆心
 * @type {Object}
 * @property {number} x 圆心的x坐标
 * @property {number} y 圆心的y坐标
 * */
const circleCenter = {
    x: bufferArea.width / 2,
    y: bufferArea.height / 2,
}
const circleCenterRef = readonly(reactive(circleCenter))
provide('circleCenter', circleCenterRef)

watchPostEffect(() => {
    if (canvasRef.value !== null) {
        canvasRef.value.width = bufferArea.width
        canvasRef.value.height = bufferArea.height
        canvasCtx.value = canvasRef.value.getContext('2d')
    }
})
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
    width: 1000px;
    height: 800px;
    border: 1px solid #000;
}
</style>