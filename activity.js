class Activity {
  constructor(category, description, minutes, seconds) {
    this.id = Date.now();
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.complete = false;
  }

  countdown() {
    if (this.minutes == 0 && this.seconds == 0) {
      alert("Time is up! Your activity has been completed!")
      return
    } else if (this.seconds >= 0) {
      this.seconds -= 1;
        if (this.seconds < 10 && this.seconds >= 0) {
            this.seconds = "0" + this.seconds;
        } 
        if (this.seconds < 0) {
          this.seconds = 59;
          this.minutes -= 1;
        }
      }
    }

  markComplete() {

  }
  saveToStorage() {
    
  }
}
