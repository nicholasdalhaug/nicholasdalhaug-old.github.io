const exercisesDOM = document.querySelector('.exercises');
const preloaderDOM = document.querySelector('.cf-preloaders');

function displayExercise(id, data) {
//  console.log(id, data);
  
  const exercise_html = `
    <div class="card-panel cf-exercises-panels" data-id="${id}">
      <div class="cf-exercises-names truncate">${data.name}</div>
      <div class="cf-exercises-settings">
        <div class="truncate"><span class="bold">Reps: </span>${data.reps}</div>
        <div class="truncate"><span class="bold">Sets: </span>${data.sets}</div>
        <div class="truncate"><span class="bold">Pause: </span>${data.pause}s</div>
        <div class="truncate"><span class="bold">Increment: </span>${data.increment}kg</div>
        <div class="truncate"><span class="bold">Weight: </span>${data.weight}kg</div>
      </div>
    </div>  
  `;
  
  exercisesDOM.innerHTML += exercise_html;
}

dbGet('exercises', displayExercise)
.then( () => {
  document.querySelector('.cf-preloaders').style.display = 'none';
});





