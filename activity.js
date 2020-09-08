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

  }
  markComplete() {

  }
  saveToStorage() {
    
  }
}
