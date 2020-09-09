//QUERY SELECTORS:
var studyButton = document.querySelector(".study");
var meditationButton = document.querySelector(".meditate");
var exerciseButton = document.querySelector(".exercise");
var green = document.querySelector("#green");

//EVENT LISTENERS:
studyButton.addEventListener("click", changeStudyColor);
meditationButton.addEventListener("click", changeMeditationColor);
exerciseButton.addEventListener("click", changeExerciseColor);

//FUNCTIONS:
function changeStudyColor() {
  if(studyButton.id === ""){
    studyButton.setAttribute("id", "green");
  } else {
    studyButton.setAttribute("id", "");
  }
  document.querySelector(".study-icon").classList.toggle("hidden");
  document.querySelector(".study-icon-active").classList.toggle("hidden");
}

function changeMeditationColor() {
  if(meditationButton.id === ""){
    meditationButton.setAttribute("id", "purple");
  } else {
    meditationButton.setAttribute("id", "");
  }
  document.querySelector(".meditate-icon").classList.toggle("hidden");
  document.querySelector(".meditate-icon-active").classList.toggle("hidden");
}
