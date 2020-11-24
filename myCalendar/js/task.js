class Task {
    //initialize the props
    constructor(title, date, important, description, location) {
        this.title = title;
        this.dueDate = date;
        this.important = important;
        this.description = description;
        this.location = location;
        this.user = "Raven"
        this.createOn = new Date(); //current date and time of computer
    }
}