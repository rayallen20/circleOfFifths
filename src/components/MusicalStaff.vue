<template>
<div class="musical-staff" ref="div">
</div>
</template>

<script setup>
import {inject} from "vue"
import emitter from "src/utils/eventBus";

// eslint-disable-next-line
defineOptions({
    name: 'MusicalStaff',
})

const canvasCtx = inject('canvasCtx')
const ctx = canvasCtx.value

const circleCenter = inject('circleCenter')

const staffImg = new Image()
staffImg.src = require('src/assets/staff.png')

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
flatImg.src = require('src/assets/flat.png')

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
sharpImg.src = require('src/assets/sharp.png')

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

/**
 * 本常量表示调号相关信息
 * Tips: 所谓调号 指的就是各调式所需的升降号和分隔线相关信息
 * @type {Object}
 * @property {Object} G 定义G大调所需的升降号和分隔线相关信息
 * @property {string} G.name 调式名称
 * @property {Array<Object>} G.flats 降号相关信息 在该数组中,每有1个对象,即表示需要绘制1个降号
 * @property {number} G.flats.offsetX 降号的x坐标偏移量
 * @property {number} G.flats.offsetY 降号的y坐标偏移量
 * @property {Array<Object>} G.sharps 升号相关信息 在该数组中,每有1个对象,即表示需要绘制1个升号
 * @property {number} G.sharps.offsetX 升号的x坐标偏移量
 * @property {number} G.sharps.offsetY 升号的y坐标偏移量
 * @property {Object} G.separator 分隔线相关信息
 * @property {boolean} G.separator.need 是否需要绘制分隔线
 * @property {Object} G.separator.offset 分隔线的偏移量
 * @property {number} G.separator.offset.x 分隔线的x坐标偏移量
 * @property {number} G.separator.offset.y 分隔线的y坐标偏移量
 * */
const toneMasks = {
    A: {
        name: 'A',
        flats: [],
        sharps: [
            {
                offsetX: 80,
                offsetY: 20,
            },
            {
                offsetX: 95,
                offsetY: 50,
            },
            {
                offsetX: 110,
                offsetY: 5,
            },
        ],
        separator: {
            need: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
    },
    E: {
        name: 'E',
        flats: [],
        sharps: [
            {
                offsetX: 80,
                offsetY: 20,
            },
            {
                offsetX: 95,
                offsetY: 50,
            },
            {
                offsetX: 110,
                offsetY: 5,
            },
            {
                offsetX: 125,
                offsetY: 40,
            },
        ],
        separator: {
            need: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
    },
    B: {
        name: 'C♭/B',
        flats: [
            {
                offsetX: 80,
                offsetY: 55,
            },
            {
                offsetX: 95,
                offsetY: 25,
            },
            {
                offsetX: 110,
                offsetY: 70,
            },
            {
                offsetX: 125,
                offsetY: 35,
            },
            {
                offsetX: 140,
                offsetY: 78,
            },
            {
                offsetX: 155,
                offsetY: 48,
            },
            {
                offsetX: 170,
                offsetY: 90,
            },
        ],
        sharps: [
            {
                offsetX: 245,
                offsetY: 20,
            },
            {
                offsetX: 260,
                offsetY: 45,
            },
            {
                offsetX: 275,
                offsetY: 5,
            },
            {
                offsetX: 290,
                offsetY: 40,
            },
            {
                offsetX: 305,
                offsetY: 70,
            },
        ],
        separator: {
            need: true,
            offset: {
                x: 220,
                y: 105,
            },
        },
    },
    FSharp: {
        name: 'G♭/F♯',
        flats: [
            {
                offsetX: 80,
                offsetY: 55,
            },
            {
                offsetX: 95,
                offsetY: 25,
            },
            {
                offsetX: 110,
                offsetY: 70,
            },
            {
                offsetX: 125,
                offsetY: 35,
            },
            {
                offsetX: 140,
                offsetY: 78,
            },
            {
                offsetX: 155,
                offsetY: 48,
            },
        ],
        sharps: [
            {
                offsetX: 230,
                offsetY: 20,
            },
            {
                offsetX: 245,
                offsetY: 45,
            },
            {
                offsetX: 260,
                offsetY: 5,
            },
            {
                offsetX: 275,
                offsetY: 40,
            },
            {
                offsetX: 290,
                offsetY: 70,
            },
            {
                offsetX: 305,
                offsetY: 25,
            },
        ],
        separator: {
            need: true,
            offset: {
                x: 205,
                y: 105,
            },
        },
    },
    DFlat: {
        name: 'D♭/C♯',
        flats: [
            {
                offsetX: 80,
                offsetY: 55,
            },
            {
                offsetX: 95,
                offsetY: 25,
            },
            {
                offsetX: 110,
                offsetY: 70,
            },
            {
                offsetX: 125,
                offsetY: 35,
            },
            {
                offsetX: 140,
                offsetY: 78,
            },
        ],
        sharps: [
            {
                offsetX: 215,
                offsetY: 20,
            },
            {
                offsetX: 230,
                offsetY: 45,
            },
            {
                offsetX: 245,
                offsetY: 5,
            },
            {
                offsetX: 260,
                offsetY: 40,
            },
            {
                offsetX: 275,
                offsetY: 70,
            },
            {
                offsetX: 290,
                offsetY: 25,
            },
            {
                offsetX: 310,
                offsetY: 50,
            },
        ],
        separator: {
            need: true,
            offset: {
                x: 190,
                y: 105,
            },
        },
    },
    AFlat: {
        name: 'A♭',
        flats: [
            {
                offsetX: 80,
                offsetY: 55,
            },
            {
                offsetX: 95,
                offsetY: 25,
            },
            {
                offsetX: 110,
                offsetY: 70,
            },
            {
                offsetX: 125,
                offsetY: 35,
            },
        ],
        sharps: [],
        separator: {
            need: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
    },
    EFlat: {
        name: 'E♭',
        flats: [
            {
                offsetX: 80,
                offsetY: 55,
            },
            {
                offsetX: 95,
                offsetY: 25,
            },
            {
                offsetX: 110,
                offsetY: 70,
            },
        ],
        sharps: [],
        separator: {
            need: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
    },
    BFlat: {
        name: 'B♭',
        flats: [
            {
                offsetX: 80,
                offsetY: 55,
            },
            {
                offsetX: 95,
                offsetY: 25,
            },
        ],
        sharps: [],
        separator: {
            need: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
    },
    F: {
        name: 'F',
        flats: [
            {
                offsetX: 80,
                offsetY: 55,
            },
        ],
        sharps: [],
        separator: {
            need: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
    },
    C: {
        name: 'C',
        flats: [],
        sharps: [],
        separator: {
            need: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
    },
    G: {
        name: 'G',
        flats: [],
        sharps: [
            {
                offsetX: 80,
                offsetY: 20,
            },
        ],
        separator: {
            need: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
    },
    D: {
        name: 'D',
        flats: [],
        sharps: [
            {
                offsetX: 80,
                offsetY: 20,
            },
            {
                offsetX: 95,
                offsetY: 50,
            },
        ],
        separator: {
            need: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
    },
}

const findToneMask = (tonalityName) => {
    for (const key in toneMasks) {
        const toneMask = toneMasks[key]
        if (toneMask.name === tonalityName) {
            return toneMask
        }
    }
    return null
}

const drawStaff = (tonality) => {
    const toneMask = findToneMask(tonality.name)

    if (toneMask === null) {
        console.error('没有找到对应的调号')
        return
    }

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

emitter.on('hoveringTonality', (tonality) => drawStaff(tonality))
</script>
