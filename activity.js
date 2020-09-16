class Activity {
  constructor(category, description, minutes, seconds, initialMinutes, initialSeconds) {
    this.id = Date.now();
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.initialMinutes = initialMinutes;
    this.initialSeconds = initialSeconds;
    this.complete = false;
  }

  countdown() {
    if (this.seconds >= 0) {
      this.seconds -= 1;
        if (this.seconds < 10 && this.seconds >= 0) {
            this.seconds = "0" + this.seconds;
        } else if (this.seconds < 0) {
          this.seconds = 59;
          this.minutes -= 1;
          if (this.minutes < 10) {
            this.minutes = "0" + this.minutes;
          }
        }
    }
  }

  markComplete() {
        if (this.seconds == 0 && this.minutes == 0) {
      this.complete = true;
    }
  }

   saveToStorage() {
     var activitiesArray = JSON.parse(localStorage.getItem("activityLog"));
     if (!activitiesArray) {
       activitiesArray = [];
     }
     activitiesArray.push(this);
     localStorage.setItem("activityLog", JSON.stringify(activitiesArray));
   }

    // localStorage.setItem("pastActivities", JSON.stringify(loggedActivity));
    // var retrievedObject = [];
    // retrievedObject.unshift(localStorage.getItem("pastActivties"));
    // var parsedObject = JSON.parse(retrievedObject[0]);
  }
