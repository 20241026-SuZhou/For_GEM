// 获取元素
const items = document.querySelectorAll('.item');
const btn = document.querySelector('.btn');
const modal = document.getElementById('prize-modal');
const modalContent = document.getElementById('prize-song');
const backgroundMusic = document.getElementById('background-music'); // 获取背景音乐元素
const playButton = document.getElementById('playButton'); // 获取播放按钮

// 随机概率
const percentArr = [10, 10, 10, 10, 10, 10, 5, 10, 10];

// 全局变量
let timer = null;
let index = 0;

// 图片与歌曲名的对应关系
const songNames = [
    "超能力",
    "唯一",
    "摩天动物园",
    "孤独",
    "来自天堂的魔鬼",
    "睡公主",
    "隐藏款--红蔷薇白玫瑰",
    "HELL",
    "A.I.N.Y"
];

// 开始抽奖
function start() {
    clearInterval(timer);
    reset();
    const randomIndex = weightedRandom(percentArr);
    const rotate = 360 / items.length * (randomIndex + 1) + 360 * 5;
    timer = setInterval(() => {
        if (index >= items.length) {
            index = 0;
        }
        items.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        index++;
    }, 50);
    setTimeout(() => {
        clearInterval(timer);
        reset();
        items[randomIndex].classList.add('active');
        modalContent.textContent = songNames[randomIndex];
        modal.style.display = "block";
        if (randomIndex === 6) {
            flash(randomIndex);
        }
    }, rotate);
}

// 重置样式
function reset() {
    items.forEach(item => {
        item.classList.remove('active');
        item.classList.remove('flash');
    });
}

// 加权随机算法
function weightedRandom(weights) {
    const total = weights.reduce((acc, val) => acc + val, 0);
    const rand = Math.random() * total;
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (rand <= sum) {
            return i;
        }
    }
    return weights.length - 1;
}

// 闪烁效果
function flash(index) {
    items[index].classList.add('flash');
    let count = 0;
    const flashInterval = setInterval(() => {
        if (count < 6) {
            items[index].classList.toggle('flash');
            count++;
        } else {
            clearInterval(flashInterval);
            items[index].classList.add('active');
        }
    }, 500);
}

// 关闭模态框
document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = "none";
});

// 绑定事件
btn.addEventListener('click', start);