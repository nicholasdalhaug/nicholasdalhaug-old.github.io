const exercisesDOM = document.querySelector('.cf-exercises');
const preloaderDOM = document.querySelector('.cf-preloaders');

// load exercises
function displayExercise(id, data) {
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

dbGetAll('exercises', displayExercise)
.then( () => {
  document.querySelector('.cf-add-buttons').style.display = 'block';
  document.querySelector('.cf-preloaders').style.display = 'none';
});





// open new exercise form
const new_exercise_button = document.querySelector('.cf-sidenav-triggers');
new_exercise_button.addEventListener('click', evt=>{
  // empty form
  const form = document.querySelector('#cf-exercise-form form');
  form.reset();
  
  // show add new button
  document.querySelector('.cf-exercise-form-exists-buttons').style.display = 'none';
  document.querySelector('.cf-exercise-form-new-buttons').style.display = 'block';
  
  // open form
  const exercise_form_element = document.querySelector('#cf-exercise-form');
  var exercise_form_instance = M.Sidenav.getInstance(exercise_form_element);
  exercise_form_instance.open();
});




// add new exercise when button pressed
const add_new_exercise_button = document.querySelector('.cf-exercise-form-new-buttons button');
add_new_exercise_button.addEventListener('click', evt => {
  
  name_string =           document.getElementById('cf-exercise-form-name').value;
  reps_string =           document.getElementById('cf-exercise-form-reps').value;
  sets_string =           document.getElementById('cf-exercise-form-sets').value;
  pause_minutes_string =  document.getElementById('cf-exercise-form-pause-minutes').value;
  pause_seconds_string =  document.getElementById('cf-exercise-form-pause-seconds').value;
  increment_string =      document.getElementById('cf-exercise-form-increment').value;
  weight_string =         document.getElementById('cf-exercise-form-weight').value;
  
  const exercise = {
    name: name_string, 
    reps: parseInt(reps_string), 
    sets: parseInt(sets_string), 
    pause: parseInt(pause_minutes_string)*60 + parseInt(pause_seconds_string), 
    increment: parseFloat(increment_string),
    weight: parseFloat(weight_string)
  };
  
  dbAdd('exercises', exercise);
  
});




// open edit exercise form
const exercisesContainer = document.querySelector('.cf-exercises');
exercisesContainer.addEventListener('click', evt=>{
  closest_exercise_panel = evt.target.closest('.cf-exercises-panels');
  if(closest_exercise_panel){
    id = closest_exercise_panel.getAttribute('data-id');
    
    dbGet('exercises', id)
    .then( data => {
      // open form
      const exercise_form_element = document.querySelector('#cf-exercise-form');
      var exercise_form_instance = M.Sidenav.getInstance(exercise_form_element);
      exercise_form_instance.open();
      
      // fill in exercise info
      var form_name = document.getElementById('cf-exercise-form-name');
      form_name.value = data.name;
      form_name.nextElementSibling.classList.add("active");
      var form_reps = document.getElementById('cf-exercise-form-reps');
      form_reps.value = data.reps;
      form_reps.nextElementSibling.classList.add("active");
      var form_sets = document.getElementById('cf-exercise-form-sets'); 
      form_sets.value = data.sets;
      form_sets.nextElementSibling.classList.add("active");
      var form_increment = document.getElementById('cf-exercise-form-increment'); 
      form_increment.value = data.increment;
      form_increment.nextElementSibling.classList.add("active");
      var form_weight = document.getElementById('cf-exercise-form-weight'); 
      form_weight.value = data.weight;
      form_weight.nextElementSibling.classList.add("active");
      var form_pause_minutes = document.getElementById('cf-exercise-form-pause-minutes');
      var form_pause_minutes_instance = M.FormSelect.getInstance(form_pause_minutes);
      form_pause_minutes_instance.input.value = Math.floor(data.pause/60);
      form_pause_minutes.value = Math.floor(data.pause/60);
      var form_pause_seconds = document.getElementById('cf-exercise-form-pause-seconds');
      var form_pause_seconds_instance = M.FormSelect.getInstance(form_pause_seconds);
      form_pause_seconds_instance.input.value = data.pause % 60;
      form_pause_seconds.value = data.pause % 60;
      
      // show delete button
      document.querySelector('.cf-exercise-form-exists-buttons').style.display = 'block';
      document.querySelector('.cf-exercise-form-new-buttons').style.display = 'none';
      
      // give id to the delete button
      document.querySelector('.cf-exercise-form-exists-buttons').id = id;
    });
    
    
    
  }
});

// update exercise when button pressed
const update_exercise_button = document.querySelector('.cf-exercise-form-exists-buttons-update');
update_exercise_button.addEventListener('click', evt => {
  const exists_buttons_wrapper = document.querySelector('.cf-exercise-form-exists-buttons');
  const id = exists_buttons_wrapper.id;
  
  name_string =           document.getElementById('cf-exercise-form-name').value;
  reps_string =           document.getElementById('cf-exercise-form-reps').value;
  sets_string =           document.getElementById('cf-exercise-form-sets').value;
  pause_minutes_string =  document.getElementById('cf-exercise-form-pause-minutes').value;
  pause_seconds_string =  document.getElementById('cf-exercise-form-pause-seconds').value;
  increment_string =      document.getElementById('cf-exercise-form-increment').value;
  weight_string =         document.getElementById('cf-exercise-form-weight').value;
  
  const exercise = {
    name: name_string, 
    reps: parseInt(reps_string), 
    sets: parseInt(sets_string), 
    pause: parseInt(pause_minutes_string)*60 + parseInt(pause_seconds_string), 
    increment: parseFloat(increment_string),
    weight: parseFloat(weight_string)
  };
  
  dbEdit('exercises', id, exercise);
  
});

// delete exercise when button pressed
const delete_exercise_button = document.querySelector('.cf-exercise-form-exists-buttons-delete');
delete_exercise_button.addEventListener('click', evt => {
  const id = document.querySelector('.cf-exercise-form-exists-buttons').id;
  dbDelete('exercises', id);
});













































