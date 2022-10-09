import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

let andDate = new Date();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notify.failure("Please choose a date in the future");
            btnStart.setAttribute('disabled', '');
        } else {
            btnStart.removeAttribute('disabled');
            andDate = selectedDates[0];
        }
        console.log(selectedDates[0]);
    },
};

flatpickr(input, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', () => {
    btnStart.setAttribute('disabled', '');
    const idInterval = setInterval(() => {
        const timeDiff = andDate.getTime() - new Date().getTime();
        let {days, hours, minutes, seconds} = convertMs(timeDiff);
        if (timeDiff <= 0) {
            clearInterval(idInterval);
            days = 0, hours = 0, minutes = 0, seconds = 0;
        }
        daysField.textContent = addLeadingZero(days);
        hoursField.textContent = addLeadingZero(hours);
        minutesField.textContent = addLeadingZero(minutes);
        secondsField.textContent = addLeadingZero(seconds);
    }, 1000);
});
