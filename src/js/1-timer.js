import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector("[data-start]");
const inputDate = document.querySelector("#datetime-picker");

btnStart.disabled = true;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = selectedDates[0];
   if (pickedDate <= new Date()) {
      iziToast.error(
        { title: "Error", 
        message: "Please choose a date in the future", 
        position: "topRight", 
        color:"#fff", 
        backgroundColor:"#EF4040"});
        btnStart.disabled = true;
    } else {
      userSelectedDate = pickedDate;
      btnStart.disabled = false;
    }
},
};

flatpickr("#datetime-picker", options);

let timerId = null;

btnStart.addEventListener("click", () => {
  btnStart.disabled = true;
  inputDate.disabled = true;

  timerId = setInterval(() => {
    const diff = userSelectedDate - new Date();

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      inputDate.disabled = false;
      return;
    }

    const time = convertMs(diff);
    updateTimerUI(time);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateTimerUI({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = days;
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}

