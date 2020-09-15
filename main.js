
//rename activitySection to newActivitySection
//rename warning function as user_____Warning
//maybe look into changing the div for the categories into buttons (maybe prevent blue outline default behavior)
//look into clearing intervals (make a global variabl that holds onto that interval value)
//--------------QUERY SELECTORS--------------:
var categories = document.querySelector(".category-names");
var studyActivity = document.querySelector(".study");
var meditateActivity = document.querySelector(".meditate");
var exerciseActivity = document.querySelector(".exercise");

var currentActivitySection = document.querySelector(".current-activity");
var currentDisplay = document.querySelector(".current-activity-display");
var countdownTimer = document.querySelector(".countdown-timer");
var bodyTimer = document.querySelector(".body-timer");

var studyIcon = document.querySelector(".study-icon");
var activeStudyIcon = document.querySelector(".study-icon-active");
var meditateIcon = document.querySelector(".meditate-icon");
var activeMeditateIcon = document.querySelector(".meditate-icon-active");
var exerciseIcon = document.querySelector(".exercise-icon");
var activeExerciseIcon = document.querySelector(".exercise-icon-active");

var startActivityButton = document.querySelector(".start-activity-button");
var newActivitySection = document.querySelector(".new-activity-section");
var userMinutes = document.querySelector(".minutes");
var userSeconds = document.querySelector(".seconds");
var userInput = document.querySelector(".input");

var categoryWarning = document.querySelector(".category-warning");
var descriptionWarning = document.querySelector(".description-warning");
var minutesWarning = document.querySelector(".minutes-warning");
var secondsWarning = document.querySelector(".seconds-warning");

var startTimer = document.querySelector(".start-timer");

var logActivityButton = document.querySelector(".log-activity-button");
var loggedActivities = document.querySelector(".logged-activities");
var loggedCategory = document.querySelector(".logged-category");
var loggedDescription = document.querySelector(".logged-description");
var loggedTime = document.querySelector(".logged-time");
var noActivitiesMessage = document.querySelector(".no-activities-message");

var completedActivitySection = document.querySelector(".completed-activity");
var completedActivityButton = document.querySelector(".completed-activity-button");
var createActivityButton = document.querySelector(".create-activity-button");

// var activitiesArray = [];
var currentActivity = new Activity();
var loggedActivity = new Activity();

//--------------EVENT LISTENERS--------------:
studyActivity.addEventListener("click", changeStudyColor);
meditateActivity.addEventListener("click", changeMeditateColor);
exerciseActivity.addEventListener("click", changeExerciseColor);

startActivityButton.addEventListener("click", checkForInputs);
userInput.addEventListener("focus", hideErrorMessage);
userMinutes.addEventListener("focus", hideErrorMessage);
userSeconds.addEventListener("focus", hideErrorMessage);
categories.addEventListener("click", hideErrorMessage);

startTimer.addEventListener("click", startCountdown);
logActivityButton.addEventListener("click", logCurrentActivity);
createActivityButton.addEventListener("click", toggleActivitySection);
window.addEventListener("load", displayStoredActivities);

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
      displayCurrentActivity();
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

function resetIcons() {
  resetStudyIcon();
  resetMeditateIcon();
  resetExerciseIcon();
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

//--------------FUNCTIONS for CURRENT ACTIVITY Section--------------
function formatMinutes() {
  if(userMinutes.value.length >= 2) {
    loggedActivity.minutes = userMinutes.value;
    currentActivity.minutes = userMinutes.value;
  } else if(userMinutes.value.length === 1) {
    loggedActivity.minutes = 0 + userMinutes.value;
    currentActivity.minutes = 0 + userMinutes.value;

  }
}

function formatSeconds() {
  if(userSeconds.value.length === 2) {
    loggedActivity.seconds = userSeconds.value;
    currentActivity.seconds = userSeconds.value;
  } else if(userSeconds.value.length === 1) {
    loggedActivity.seconds = 0 + userSeconds.value;
    currentActivity.seconds = 0 + userSeconds.value;
  }
}

function storeUserInput() {
  loggedActivity.description = userInput.value;
  currentActivity.description = userInput.value;
  formatMinutes();
  formatSeconds();
}

function insertActivityInfo() {
    currentDisplay.innerHTML = ''
    currentDisplay.innerHTML = `${currentActivity.description}
    <div class="countdown-timer">
    ${currentActivity.minutes}:${currentActivity.seconds}
    </div>`
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

function displayCurrentActivity() {
  storeUserInput();
  newActivitySection.classList.add("hidden");
  currentActivitySection.classList.remove("hidden");
  insertActivityInfo();
  changeStartTimerColor();
}

function countdownAndInsertActivityInfo() { //could this function be renamed?
  if (currentActivity.minutes > 0 || currentActivity.seconds > 0) {
    currentActivity.countdown();
    insertActivityInfo();
    setTimeout(countdownAndInsertActivityInfo, 1000);
    //changed the "startTimer" HTML element from div to button...
    //in order to fix the repeated clicks = rapid countdown bug,
    //but not sure if i like this solution (on line below).
    startTimer.disabled = true;
  } else {
    currentActivity.markComplete();
    startTimer.innerText = "COMPLETE!";
    logActivityButton.classList.remove("hidden");
  }
}

function startCountdown() {
  setTimeout(countdownAndInsertActivityInfo, 1000);
}

//--------------FUNCTIONS for LOGGED ACTIVITIES--------------
function displayStoredActivities() {
  for (var i = 0; i < )
}

function displayLoggedActivity() {
  loggedActivities.insertAdjacentHTML("afterbegin", `
  <section class="logged-activity" id=${loggedActivity.id}>
    <div class="logged-category" id="${loggedActivity.category}">
      ${loggedActivity.category}
    </div>
    <div class="logged-time" id="${loggedActivity.category}">
      ${loggedActivity.minutes} MIN  ${loggedActivity.seconds} SECONDS
    </div>
    <div class="logged-description">${loggedActivity.description}</div>
  </section>
  `)
}

//might be able to use this function for all buttons
//that hide/display a different activity section
function toggleActivitySection() {
  if(event.target.className === "log-activity-button"){
    currentActivitySection.classList.add("hidden");
    completedActivitySection.classList.remove("hidden");
  } else if(event.target.className === "create-activity-button") {
    resetActivitySections();
    completedActivitySection.classList.add("hidden");
    newActivitySection.classList.remove("hidden");
  }
}

function resetUserInputs() {
  userInput.value = "";
  userMinutes.value = "";
  userSeconds.value = ""
}
function resetCurrentActivitySection() {
  startTimer.innerText = "START";
  logActivityButton.classList.add("hidden");
  startTimer.disabled = false;
}

function resetActivitySections() {
  resetIcons();
  resetUserInputs();
  resetCurrentActivitySection();
}

function logCurrentActivity() {
  noActivitiesMessage.classList.add("hidden");
  loggedActivity.id = currentActivity.id;
  loggedActivity.category = currentActivity.category;
  loggedActivity.complete = currentActivity.complete;
  displayLoggedActivity();
  loggedActivity.saveToStorage();
  toggleActivitySection();
}

// function displayPreviousActivities() {
//   pastActivities.unshift(localStorage.getItem("pastActivties"));
// }


// function displayNewestActivity() {
//   loggedActivity.saveToStorage();
//
// }
