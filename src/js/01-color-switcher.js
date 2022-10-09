function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;

btnStart.addEventListener('click', () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnStart.setAttribute('disabled', '');
    btnStop.removeAttribute('disabled');
});

btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    btnStop.setAttribute('disabled', '');
    btnStart.removeAttribute('disabled');
});