import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const elements = {
    input: document.getElementById('datetime-picker'),
    btn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
}

elements.btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
      const currentDate = new Date();
      if (selectedDates[0] < currentDate) {
         Notiflix.Notify.warning("Please choose a date in the future");
          elements.btn.disabled = true;
      } else {
          elements.btn.disabled = false;
      }
          
  },
};
       

const picker = flatpickr(elements.input, options);

function addLeadingZero(value) {
     return value.toString().padStart(2, '0');
     }

elements.btn.addEventListener('click', () => {    
    const interval = setInterval(() => {
       const selectedTime = picker.selectedDates[0];
      
        const currentDate = new Date();
        const timerTime = selectedTime - currentDate;
        if (timerTime >= 0) {
            let timeConvertor = convertMs(timerTime);
             elements.days.textContent = addLeadingZero(timeConvertor.days);
             elements.hours.textContent = addLeadingZero(timeConvertor.hours);
             elements.minutes.textContent = addLeadingZero(timeConvertor.minutes);
             elements.seconds.textContent = addLeadingZero(timeConvertor.seconds);
            
        } else {
            clearInterval(interval);
        }
        
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
   console.log( days, hours, minutes, seconds );
  return { days, hours, minutes, seconds };
}

const styles = `
 .timer {
   display: flex;
   gap:25px;
 }

.field {
  display: flex;
  flex-direction:column;

 }

 .value {
  font-size: 20px;
  font-weight: bold;
 }
`;

const styleEl = document.createElement('style');
styleEl.textContent = styles;

document.head.appendChild(styleEl);