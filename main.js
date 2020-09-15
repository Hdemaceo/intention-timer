
//rename activitySection to newActivitySection
//rename warning function as user_____Warning
//maybe look into changing the div for the categories into buttons (maybe prevent blue outline default behavior)
//look into clearing intervals (make a global variabl that holds onto that interval value)
//--------------QUERY SELECTORS--------------:
var categories = document.querySelector(".category-names");
var studyActivity = document.querySelector(".study");
var meditateActivity = document.querySelector(".meditate");
var exerciseActivity = document.querySelector(".exercise");

var currentActivityPage = document.querySelector(".current-activity");
var currentDisplay = document.querySelector(".current-activity-display");
var countdownTimer = document.querySelector(".countdown-timer");
var bodyTimer = document.querySelector(".body-timer");

var studyIcon = document.querySelector(".study-icon");
var activeStudyIcon = document.querySelector(".study-icon-active");
var meditateIcon = document.querySelector(".meditate-icon");
var activeMeditateIcon = document.querySelector(".meditate-icon-active");
var exerciseIcon = document.querySelector(".exercise-icon");
var activeExerciseIcon = document.querySelector(".exercise-icon-active");

var startButton = document.querySelector(".start-button");
var newActivitySection = document.querySelector(".new-activity-section");
var userMinutes = document.querySelector(".minutes");
var userSeconds = document.querySelector(".seconds");
var userInput = document.querySelector(".input");

var categoryWarning = document.querySelector(".category-warning");
var descriptionWarning = document.querySelector(".description-warning");
var minutesWarning = document.querySelector(".minutes-warning");
var secondsWarning = document.querySelector(".seconds-warning");

var startTimer = document.querySelector(".start-timer");


var currentActivity = new Activity();

//--------------EVENT LISTENERS--------------:
studyActivity.addEventListener("click", changeStudyColor);
meditateActivity.addEventListener("click", changeMeditateColor);
exerciseActivity.addEventListener("click", changeExerciseColor);

startButton.addEventListener("click", checkForInputs);
userInput.addEventListener("focus", hideErrorMessage);
userMinutes.addEventListener("focus", hideErrorMessage);
userSeconds.addEventListener("focus", hideErrorMessage);
categories.addEventListener("click", hideErrorMessage);

startTimer.addEventListener("click", startCountdown);

//--------------FUNCTIONS for NEW ACTIVITY section--------------

function checkForInputs() {
    if (currentActivity.category === undefined) {
        categoryWarning.classList.remove("hidden");
    } else if (userInput.value === "") {
        descriptionWarning.classList.remove("hidden");
    } else if (userMinutes.value === ""
        || isNaN(userMinutes.value)
        || userMinutes.value.includes(" ")
        || userMinutes.value < 0
        || userMinutes.value.charAt(0) === "-") {
        minutesWarning.classList.remove("hidden");
    } else if (userSeconds.value === ""
        || isNaN(userSeconds.value)
        || userSeconds.value.includes(" ")
        || userSeconds.value.length > 2
        || userSeconds.value >= 60
        || userSeconds.value.charAt(0) === "-") {
        secondsWarning.classList.remove("hidden");
    } else {
        displayTimerPage();
    }
}

function hideErrorMessage(event) {
    if (event.target.classList.contains("category")) {
        categoryWarning.classList.add("hidden");
    } else if (event.target.className === "input") {
        descriptionWarning.classList.add("hidden");
    } else if (event.target.className === "seconds") {
        secondsWarning.classList.add("hidden");
    } else if (event.target.className === "minutes") {
        minutesWarning.classList.add("hidden");
    }
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
  storeUserInput();
  newActivitySection.classList.add("hidden");
  currentActivityPage.classList.remove("hidden");
  insertActivityInfo();
  changeStartTimerColor();
}

function insertActivityInfo() {
    currentDisplay.innerHTML = ''
    currentDisplay.innerHTML = `${currentActivity.description}
    <div class="countdown-timer">
    ${currentActivity.minutes}:${currentActivity.seconds}
    </div>`
}

function countdownAndInsertActivityInfo() {
  if (currentActivity.minutes > 0 || currentActivity.seconds > 0) {
    currentActivity.countdown();
    insertActivityInfo();
    setTimeout(countdownAndInsertActivityInfo, 1000);
  }
}

function changeStartTimerColor() {
  if(currentActivity.category === "Study") {
    startTimer.setAttribute("id", "green")
  } else if(currentActivity.category === "Meditate") {
    startTimer.setAttribute("id", "purple")
  } else if(currentActivity.category === "Exercise") {
    startTimer.setAttribute("id", "orange")
  }
  startTimer.style.color = "white";
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

function startCountdown() {
  setTimeout(countdownAndInsertActivityInfo, 1000)
}

//go to HTML and create elements that will hold currentActivity data
//use querySelector to grab those elements and bring them into our javascript
//
