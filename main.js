//--------------QUERY SELECTORS--------------:
var categories = document.querySelector(".category-names");
var studyActivity = document.querySelector(".study");
var meditateActivity = document.querySelector(".meditate");
var exerciseActivity = document.querySelector(".exercise");

var currentActivitySection = document.querySelector(".current-activity");
var currentDisplay = document.querySelector(".current-activity-display");

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

var currentActivity = new Activity();

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
    currentActivity.minutes = userMinutes.value;
    currentActivity.initialMinutes = userMinutes.value;
  } else if(userMinutes.value.length === 1) {
    currentActivity.minutes = 0 + userMinutes.value;
    currentActivity.initialMinutes = 0 + userMinutes.value;
  }
}

function formatSeconds() {
  if(userSeconds.value.length === 2) {
    currentActivity.seconds = userSeconds.value;
    currentActivity.initialSeconds = userSeconds.value;
  } else if(userSeconds.value.length === 1) {
    currentActivity.seconds = 0 + userSeconds.value;
    currentActivity.initialSeconds = 0 + userSeconds.value;
  }
}

function storeUserInput() {
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

function countdownAndInsertActivityInfo() {
  if (currentActivity.minutes > 0 || currentActivity.seconds > 0) {
    currentActivity.countdown();
    insertActivityInfo();
    setTimeout(countdownAndInsertActivityInfo, 1000);
  } else {
    currentActivity.markComplete();
  }
}

function startCountdown() {
  setTimeout(countdownAndInsertActivityInfo, 1000);
  startTimer.disabled = true;
}

//--------------FUNCTIONS for LOGGED ACTIVITIES--------------
function displayStoredActivities() {
  var activitiesArray = JSON.parse(localStorage.getItem("activityLog"));
  if (activitiesArray.length !== 0) {
    noActivitiesMessage.classList.add('hidden');
    loggedActivities.innerHTML = "";
  }
  for (var i = 0; i < activitiesArray.length; i++) {
    loggedActivities.insertAdjacentHTML("afterbegin", `
    <section class="logged-activity" id=${activitiesArray[i].id}>
      <div class="logged-category" id="${activitiesArray[i].category}">
        ${activitiesArray[i].category}
      </div>
      <div class="logged-time" id="${activitiesArray[i].category}">
        ${activitiesArray[i].initialMinutes} MIN  ${activitiesArray[i].initialSeconds} SECONDS
      </div>
      <div class="logged-description">${activitiesArray[i].description}</div>
    </section>
    `)
  }
}

function toggleActivitySection() {
  if (event.target.classList.contains("log-activity-button")) {
    currentActivitySection.classList.add("hidden");
    completedActivitySection.classList.remove("hidden");
  } else if (event.target.classList.contains("create-activity-button")) {
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
  currentActivity.saveToStorage();
  displayStoredActivities();
  toggleActivitySection();
}
