//QUERY SELECTORS:
var studyButton = document.querySelector(".study");
var meditationButton = document.querySelector(".meditate");
var exerciseButton = document.querySelector(".exercise");

//EVENT LISTENERS:
studyButton.addEventListener("click", changeStudyColor);
meditationButton.addEventListener("click", changeMeditationColor);
exerciseButton.addEventListener("click", changeExerciseColor);
