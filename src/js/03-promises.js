import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = Number(form.elements['amount'].value);
  const delay = Number(form.elements['delay'].value);
  const step = Number(form.elements['step'].value);

  for (let i = 0; i < amount; i++) {
    createPromise(i, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});