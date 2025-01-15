
let selectedTimeframe = 'weekly';

const daily = document.querySelector('#daily');
const weekly = document.querySelector('#weekly');
const monthly = document.querySelector('#monthly');

function getRangeText(timeframe) {
  switch(timeframe) {
    case 'daily': 
      daily.classList.add('active');
      weekly.classList.remove('active');
      monthly.classList.remove('active');
      return 'Yesterday'; 
    case 'weekly': 
      daily.classList.remove('active');
      weekly.classList.add('active');
      monthly.classList.remove('active');
      return 'Last Week'; 
    case 'monthly': 
      daily.classList.remove('active');
      weekly.classList.remove('active');
      monthly.classList.add('active');
      return 'Last Month'; 
    default: return '';
  }
}

function updateData(timeframe){
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {

      data.forEach(item => {

        const card = document.querySelector(`.${item.title.toLowerCase().replace(' ', '-')}`);
        if (!card) return;
      
        const title = card.querySelector('#title');
        const current = card.querySelector('#current');
        const previous = card.querySelector('#previous');

        title.textContent = item.title;
        current.textContent = `${item.timeframes[timeframe].current}hrs`;
        previous.textContent = `${getRangeText(timeframe)} - ${item.timeframes[timeframe].previous}hrs`;
      });

    })
    .catch(error => {
      console.error('Error:', error);
    });
    console.log("succed");
}

updateData(selectedTimeframe);

function changeTimeframe(timeframe) {
  selectedTimeframe = timeframe;
  updateData(selectedTimeframe);
}

