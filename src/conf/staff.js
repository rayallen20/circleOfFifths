/**
 * 本常量表示调号相关信息
 * Tips: 所谓调号 指的就是各调式所需的升降号和分隔线相关信息
 * @type {Array}
 * @property {Object} name 调式名称
 * @property {String} name.major 大调调式名称
 * @property {String} name.minor 小调调式名称
 * @property {Array<Object>} flats 降号相关信息 在该数组中,每有1个对象,即表示需要绘制1个降号
 * @property {number} flats.offsetX 降号的x坐标偏移量
 * @property {number} flats.offsetY 降号的y坐标偏移量
 * @property {Array<Object>} sharps 升号相关信息 在该数组中,每有1个对象,即表示需要绘制1个升号
 * @property {number} sharps.offsetX 升号的x坐标偏移量
 * @property {number} sharps.offsetY 升号的y坐标偏移量
 * @property {Object} separator 分隔线相关信息
 * @property {boolean} separator.need 是否需要绘制分隔线
 * @property {Object} separator.offset 分隔线的偏移量
 * @property {number} separator.offset.x 分隔线的x坐标偏移量
 * @property {number} separator.offset.y 分隔线的y坐标偏移量
 * */
const toneMasks = [
    {
        name: {
            major: 'A',
            minor: 'F♯m',
        },
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
    {
        name: {
            major: 'E',
            minor: 'C♯m',
        },
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
    {
        name: {
            major: 'C♭/B',
            minor: 'A♭m/G♯m',
        },
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
    {
        name: {
            major: 'G♭/F♯',
            minor: 'E♭m/D♯m',
        },
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
    {
        name: {
            major: 'D♭/C♯',
            minor: 'B♭m/A♯m',
        },
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
    {
        name: {
            major: 'A♭',
            minor: 'Fm',
        },
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
    {
        name: {
            major: 'E♭',
            minor: 'Cm',
        },
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
    {
        name: {
            major: 'B♭',
            minor: 'Gm',
        },
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
    {
        name: {
            major: 'F',
            minor: 'Dm',
        },
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
    {
        name: {
            major: 'C',
            minor: 'Am',
        },
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
    {
        name: {
            major: 'G',
            minor: 'Em',
        },
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
    {
        name: {
            major: 'D',
            minor: 'Bm',
        },
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
]

function findToneMask(index) {
    if (index < 0 || index >= toneMasks.length) {
        throw new Error('Invalid index for tone mask')
    }
    return toneMasks[index]
}

export default findToneMask