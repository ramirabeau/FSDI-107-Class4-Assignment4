var isItImportant = false;
var detailsVisible = true;

// Make a var hide=

function toggleImportant() {
    if (isItImportant) {
        $("#iconImp").removeClass('fas').addClass('far');
        isItImportant = false;
    } else {
        $("#iconImp").removeClass('far').addClass('fas');
        isItImportant = true;
    }

}

function toggleDetails() {
    if (detailsVisible) {
        $("#secForm").hide();
        $("#iconEye").removeClass('fas').addClass('far');
        /* This will replace the "show details icon" in the html
        <div>
            <button id="hideDetails" class="btn btn-primary">
                <i id="iconEyeSlash" class="<i class="fas fa-eye-slash"></i>
                </i>Hide Details</button>
        </div>*/
        detailsVisible = false;
    } else {
        $("#secForm").show();
        $("#iconEye").removeClass('far').addClass('fas');
        detailsVisible = true;
    }

}

function createTask() {
    //get values from inputs
    //hide the error message
    var title = $("#txtTitle").val();
    var dueDate = $("#txtDate").val();
    var description = $("#txtDescription").val()
    var location = $("#txtLocation").val();

    //apply validation rules
    $("#alertTitle").hide();
    if (title.length < 5) {
        $("#alertTitle").show();
        //strt a timer to hide it
        setTimeout(() => $("#alertTitle").fadeOut(), 4000);
        //show the alert
        return;
    }

    //create the object
    var task = new Task(title, dueDate, isItImportant, description, location);
    //send the object to the server
    console.log(task);
    //display the task
    displayTask(task);
    //clear the form
    clear()

}

function displayTask(task) {
    var syntax = `
    <div class='task'>
        <i id="iconImp2" class="far fa-star task-section"></i>
        <div class='task-section'>
            <h5>${task.title}</h5>
            <label>${task.dueDate}</label>
        </div>
        <label class='task-section'>${task.description}</label>
        <label class='task-section'>${task.location}</label>
    

    </div>
    `;
    console.log("Display Task");
    $("#pendingTasks").append(syntax);
    $("#createTask").val("");


}

function clear() {
    $("#txtTitle").val("");
    $("#txtDate").val("");
    $("#txtDescription").val("");
    $("#txtLocation").val("");

    if (isItImportant) {
        toggleImportant();
    }


}



function init() {
    console.log("My Calendar");
    //inside the init, we load data and hook events
    toggleDetails();
    $("#iconImp").click(toggleImportant);
    $("#showDetails").click(toggleDetails);
    $("#btnSaveTask").click(createTask);
    $("#alertTitle").hide();


}



window.onload = init;

/**
 * 
 * http requests
 * http methods
 * http status codes
 */