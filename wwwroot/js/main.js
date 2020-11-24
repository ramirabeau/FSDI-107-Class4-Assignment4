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
    $.ajax({
        type: 'POST',
        url: '/api/savetask', //from ApiController.cs line 14
        data: JSON.stringify(task),
        contentType: 'application/json',
        success: function(res) {
            //show a success message
            console.log("Server says:", res);
            //display the task
            displayTask(res);
            // clear the form
            clear();

        },
        error: function(details) {
            console.log("Error:", details);
            //show an error to the user
        }

    });

}

function displayTask(task) {
    var cssClass = '';
    if (task.important) cssClass = 'fas';
    else cssClass = 'far';

    //parse the date string into a date object
    var date = new Date(task.dueDate);
    var syntax = `
    <div class='task'>
        <i id="iconImp2" class="far fa-star task-section"></i>
        <div class='task-section'>
            <h5>${task.title}</h5>
            <label>${task.dueDate}</label>
        </div>
        <label class='task-section'>${task.description}</label>
        <label class='task-section'>${task.location}</label>
        <div class = 'task-section' >
        <i class = "fas fa-trash"
    onclick ='deleteTask(${task.id})' > </i> </div>

    </div>
    `;
    console.log("Display Task");
    $("#pendingTasks").append(syntax);
    $("#createTask").val("");


}

function deleteTask(id) {
    console.log('Deleting', id);
    $.ajax({
        type: 'DELETE',
        url: server + '/tasks/' + id,
        success: function(res) {
            console.log("Deleted");

            $("#task" + id).remove(); // $("#task13").remove();
        },
        error: function(details) {
            console.log("Error", details);
        }
    });
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

function fetchTasksFromServer() {
    //GET AJAX Request
    //console log response from the server
    $.ajax({
        type: 'GET',
        url: '/api/getTasks', //from line29 in ApiController.cs
        success: function(res) {
            console.log("Data from server", res);

            for (let i = 0; i < res.length; i++) {
                let task = res[i];
                if (task.user === "Raven") {
                    displayTask(task);
                }
            }
        },
        error: function(details) {
            console.log("Error getting data", details);
        }
    });
}


function init() {
    console.log("My Calendar");
    //inside the init, we load data and hook events
    toggleDetails();
    fetchTasksFromServer();
    $("#iconImp").click(toggleImportant);
    $("#showDetails").click(toggleDetails);
    $("#btnSaveTask").click(createTask);
    $("#alertTitle").hide();


}

function testGet() {
    $.ajax({
        type: 'GET',
        url: '/api/test',
        suddess: function(res) {
            console.log("Succeed", res);
        },
        error: function(details) {
            console.log("Error :(", details);
        }
    });
}


window.onload = init;

/**
 * 
 * http requests
 * http methods
 * http status codes
 */