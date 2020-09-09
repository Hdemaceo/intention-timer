//QUERY SELECTORS:
var studyButton = document.querySelector(".study");
var meditationButton = document.querySelector(".meditate");
var exerciseButton = document.querySelector(".exercise");


//EVENT LISTENERS:
studyButton.addEventListener("click", changeStudyColor);
meditationButton.addEventListener("click", changeMeditationColor);
exerciseButton.addEventListener("click", changeExerciseColor);

//FUNCTIONS:

function toggleStudyIcon(){
  document.querySelector(".study-icon").classList.remove("hidden");
  document.querySelector(".study-icon-active").classList.add("hidden");
}
function toggleMeditationIcon(){
  document.querySelector(".meditate-icon").classList.remove("hidden");
  document.querySelector(".meditate-icon-active").classList.add("hidden");
}

function toggleExerciseIcon(){
  document.querySelector(".exercise-icon").classList.remove("hidden");
  document.querySelector(".exercise-icon-active").classList.add("hidden");
}

function resetColors(){
  studyButton.setAttribute("id", "");
  meditationButton.setAttribute("id", "");
  exerciseButton.setAttribute("id", "");
  toggleMeditationIcon();
  toggleStudyIcon();
  toggleExerciseIcon();
}

function changeStudyColor() {
  resetColors();
  if(studyButton.id === ""){
    studyButton.setAttribute("id", "green");
  } else {
    studyButton.setAttribute("id", "");
  }
  document.querySelector(".study-icon").classList.toggle("hidden");
  document.querySelector(".study-icon-active").classList.toggle("hidden");
}
function changeMeditationColor() {
  resetColors();
  if(meditationButton.id === ""){
    meditationButton.setAttribute("id", "purple");
  } else {
    meditationButton.setAttribute("id", "");
  }
  document.querySelector(".meditate-icon").classList.toggle("hidden");
  document.querySelector(".meditate-icon-active").classList.toggle("hidden");
}
function changeExerciseColor() {
  resetColors();
  if(exerciseButton.id === ""){
    exerciseButton.setAttribute("id", "orange");
  } else {
    exerciseButton.setAttribute("id", "");
  }
  document.querySelector(".exercise-icon").classList.toggle("hidden");
  document.querySelector(".exercise-icon-active").classList.toggle("hidden");
}
