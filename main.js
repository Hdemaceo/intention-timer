
//--------------QUERY SELECTORS--------------:
var categories = document.querySelector(".category-names");
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

var currentActivity = new Activity();

//--------------EVENT LISTENERS--------------:
studyActivity.addEventListener("click", changeStudyColor);
meditateActivity.addEventListener("click", changeMeditateColor);
exerciseActivity.addEventListener("click", changeExerciseColor);
categories.addEventListener("click", toggleDisabled);
userInput.addEventListener("keyup", toggleDisabled);
userMinutes.addEventListener("keyup", toggleDisabled);
userSeconds.addEventListener("keyup", toggleDisabled);
startButton.addEventListener("click", displayTimerPage)

//--------------FUNCTIONS--------------:

function toggleDisabled() {
  if(isNaN(userMinutes.value) || isNaN(userSeconds.value)
  || userMinutes.value.includes(" ") || userSeconds.value.includes(" ")
  || userInput.value === "" || userMinutes.value === ""
  || currentActivity.category === undefined || userSeconds.value.length > 2
  || userSeconds.value === "") {
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
  // need to establish currentActivity.category to enable start button
}


function formatMinutes() {
  if(userMinutes.value.length >= 2) {
    currentActivity.minutes = userMinutes.value;
  } else if(userMinutes.value.length === 1) {
    currentActivity.minutes = 0 + userMinutes.value;
  }
}
function formatSeconds() {
  if(userSeconds.value.length === 2) {
    currentActivity.seconds = userSeconds.value;
  } else if(userSeconds.value.length === 1) {
    currentActivity.seconds = 0 + userSeconds.value;
  }
}

function storeUserInput() {
  currentActivity.description = userInput.value;
  formatMinutes();
  formatSeconds();
}

function displayTimerPage() {
  activitySection.innerText = "";
  storeUserInput();
  activitySection.insertAdjacentHTML("afterbegin", `
  <div class="activity-title">Current Activity</div>
  <section class="body-timer">
  <section class="time-page" id=${currentActivity.id}>${currentActivity.description}
    <div class="countdown-timer">${currentActivity.minutes}:${currentActivity.seconds}
    </div>
    <div class="start-timer">START</div>
  </section>
  </section>
  `)
  //change the color of the start-timer border to = the currentActivity.category color.
}


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
