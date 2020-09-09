
//--------------QUERY SELECTORS--------------:
var studyActivity = document.querySelector(".study");
var meditateActivity = document.querySelector(".meditate");
var exerciseActivity = document.querySelector(".exercise");

var studyIcon = document.querySelector(".study-icon");
var activeStudyIcon = document.querySelector(".study-icon-active");
var meditateIcon = document.querySelector(".meditate-icon");
var activeMeditateIcon = document.querySelector(".meditate-icon-active");
var exerciseIcon = document.querySelector(".exercise-icon");
var activeExerciseIcon = document.querySelector(".exercise-icon-active");

var startButton = document.querySelector(".start-button");
var activitySection = document.querySelector(".activity-section");
var userMinutes = document.querySelector(".minutes");
var userSeconds = document.querySelector(".seconds");
var userInput = document.querySelector(".input");
var startTimer = document.querySelector(".start-timer");


//--------------EVENT LISTENERS--------------:
studyActivity.addEventListener("click", changeStudyColor);
meditateActivity.addEventListener("click", changeMeditateColor);
exerciseActivity.addEventListener("click", changeExerciseColor);



function resetStudyIcon() {
  studyActivity.setAttribute("id", "");
  studyIcon.classList.remove("hidden");
  activeStudyIcon.classList.add("hidden");
}
function resetMeditateIcon() {
  meditateActivity.setAttribute("id", "");
  meditateIcon.classList.remove("hidden");
  activeMeditateIcon.classList.add("hidden");
}
function resetExerciseIcon() {
  exerciseActivity.setAttribute("id", "");
  exerciseIcon.classList.remove("hidden");
  activeExerciseIcon.classList.add("hidden");
}

function activateStudyIcon(){
  studyActivity.setAttribute("id", "green");
  studyIcon.classList.add("hidden");
  activeStudyIcon.classList.remove("hidden");
}
function activateMeditateIcon(){
  meditateActivity.setAttribute("id", "purple");
  meditateIcon.classList.add("hidden");
  activeMeditateIcon.classList.remove("hidden");
}
function activateExerciseIcon(){
  exerciseActivity.setAttribute("id", "orange");
  exerciseIcon.classList.add("hidden");
  activeExerciseIcon.classList.remove("hidden");
}

function resetIcons() {
  resetStudyIcon();
  resetMeditateIcon();
  resetExerciseIcon();
}

function changeStudyColor() {
  resetIcons();
  studyActivity.id === "" ? activateStudyIcon() : resetStudyIcon();
  currentActivity.category = "Study";
}
function changeMeditateColor() {
  resetIcons();
  meditateActivity.id === "" ? activateMeditateIcon() : resetMeditateIcon();
  currentActivity.category = "Meditate";
}
function changeExerciseColor() {
  resetIcons();
  exerciseActivity.id === "" ? activateExerciseIcon() : resetExerciseIcon();
  currentActivity.category = "Exercise";
}
