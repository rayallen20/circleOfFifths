<template>
<div class="musical-staff" ref="div">
</div>
</template>

<script setup>
import emitter from "@/utils/eventBus"

// eslint-disable-next-line
defineOptions({
    name: 'MusicalStaff',
})

// eslint-disable-next-line
const props = defineProps({
    canvasCtx: {
        type: Object,
        required: true,
    },
    circleCenter: {
        type: Object,
        required: true,
    },
})
// eslint-disable-next-line vue/no-setup-props-destructure
const ctx = props.canvasCtx

// eslint-disable-next-line vue/no-setup-props-destructure
const circleCenter = props.circleCenter

const staffImg = new Image()
staffImg.src = require('@/assets/staff.png')

/**
 * 本常量用于表示绘制五线谱图像时的起始点(左上角)坐标
 * @type {Object}
 * @property {number} x 五线谱图像起始点的x坐标
 * @property {number} y 五线谱图像起始点的y坐标
 * Tips: 本坐标值将在图片加载完成后赋值 故此处的值为undefined
 * */
const staffStartPoint = {
    x: undefined,
    y: undefined,
}

/**
 * 本常量用于在五线谱图像加载完成后赋值起始点坐标
 * @type {Promise}
 * Tips: 由于后续的升降号图像都需要在五线谱图像加载完成后才能计算出坐标 故此处使用Promise对象实现起始点坐标的赋值
 * */
const staffPromise = new Promise(resolve => {
    staffImg.addEventListener('load', () => {
        staffStartPoint.x = circleCenter.x - staffImg.width / 2
        staffStartPoint.y = circleCenter.y - staffImg.height / 2
        resolve()
    })
})

const flatImg = new Image()
flatImg.src = require('@/assets/flat.png')

/**
 * 本常量用于表示绘制降号图像时的起始点(左上角)坐标
 * @type {Object}
 * @property {number} x 降号图像起始点的x坐标
 * @property {number} y 降号图像起始点的y坐标
 * Tips: 本坐标值将在五线谱图片加载完成后且降号图像加载完成后赋值 故此处的值为undefined
 * Tips: 后续绘制降号时 根据该初始坐标值进行偏移
 * */
const flatStartPoint = {
    x: undefined,
    y: undefined,
}

const locateFlat = () => {
    staffPromise.then(() => {
        flatStartPoint.x = staffStartPoint.x
        flatStartPoint.y = staffStartPoint.y
    })
}
flatImg.addEventListener('load', locateFlat)

const sharpImg = new Image()
sharpImg.src = require('@/assets/sharp.png')

/**
 * 本常量用于表示绘制升号图像时的起始点(左上角)坐标
 * @type {Object}
 * @property {number} x 升号图像起始点的x坐标
 * @property {number} y 升号图像起始点的y坐标
 * Tips: 本坐标值将在五线谱图片加载完成后且升号图像加载完成后赋值 故此处的值为undefined
 * Tips: 后续绘制升号时 根据该初始坐标值进行偏移
 * */
const sharpStartPoint = {
    x: undefined,
    y: undefined,
}

const locateSharp = () => {
    staffPromise.then(() => {
        sharpStartPoint.x = staffStartPoint.x
        sharpStartPoint.y = staffStartPoint.y
    })
}
sharpImg.addEventListener('load', locateSharp)

/**
 * 本常量用于表示绘制分割线时的相关信息
 * @type {Object}
 * @property {string} content 分割线的内容
 * @property {Object} separatorStartPoint 分割线起始点坐标
 * Tips: 文字是没有起始点的概念的,这里只是为了方便后续在配置项中设置偏移量,所以定义了一个起始点的坐标
 * Tips: 本坐标值将在五线谱图片加载完成后后赋值 故此处的值为undefined
 * Tips: 后续绘制分割线时 根据该初始坐标值进行偏移
 * @property {number} separatorStartPoint.x 分割线起始点的x坐标
 * @property {number} separatorStartPoint.y 分割线起始点的y坐标
 * @property {string} style 分割线的字体样式
 * */
const separator = {
    content: '|',
    separatorStartPoint: {
        x: undefined,
        y: undefined,
    },
    style: '78px Microsoft YaHei',
}

staffPromise.then(() => {
    separator.separatorStartPoint.x = staffStartPoint.x
    separator.separatorStartPoint.y = staffStartPoint.y
})

/**
 * 本常量表示绘制升降号时的缩放比例
 * @type {Object}
 * @property {number} horizontal 水平缩放比例
 * @property {number} vertical 垂直缩放比例
 * */
const scaling = {
    horizontal: 50,
    vertical: 50,
}

const drawStaff = (toneMask) => {
    // 清空画布的五线谱区域
    ctx.clearRect(staffStartPoint.x, staffStartPoint.y, staffImg.width, staffImg.height)

    // 绘制五线谱
    ctx.drawImage(staffImg, staffStartPoint.x, staffStartPoint.y)

    // 绘制降号
    toneMask.flats.forEach(flat => {
        ctx.drawImage(flatImg, flatStartPoint.x + flat.offsetX, flatStartPoint.y + flat.offsetY, scaling.horizontal, scaling.vertical)
    })

    // 绘制分隔线
    if (toneMask.separator.need) {
        ctx.font = separator.style
        ctx.fillText(separator.content, separator.separatorStartPoint.x + toneMask.separator.offset.x, separator.separatorStartPoint.y + toneMask.separator.offset.y)
    }

    // 绘制升号
    toneMask.sharps.forEach(sharp => {
        ctx.drawImage(sharpImg, sharpStartPoint.x + sharp.offsetX, sharpStartPoint.y + sharp.offsetY, scaling.horizontal, scaling.vertical)
    })
}

emitter.on('hoveringTonality', (toneMask) => drawStaff(toneMask))
</script>
