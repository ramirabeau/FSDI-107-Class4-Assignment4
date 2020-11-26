
using Microsoft.AspNetCore.Mvc;
using Class2_FS_Calendar.Models;
using System.Collections.Generic;
using System.Linq;


namespace Class2_FS_Calendar.Controllers
{

    public class ApiController : Controller
    {
        private DataContext dbContext;

        public ApiController(DataContext db)
        {
            this.dbContext = db;
        }


        [HttpPost]
        public IActionResult SaveTask([FromBody] Task theTask)
        {
            //save the object
            dbContext.Tasks.Add(theTask);
            dbContext.SaveChanges();
           
            //return the object
            return Json(theTask);
        }

        [HttpGet]
        public IActionResult GetTasks()
        {

            var allTasks = dbContext.Tasks.ToList();
            return Json(allTasks);

            /*
            var list = new List<Task>();
            var myTask = new Task();
            myTask.Title = "Hardcoded";
            myTask.Important = true;
            myTask.Description = "This is a test task";
            myTask.Location = "Backend";
            myTask.User = "Raven";

            list.Add(myTask);
            return Json(list);
            */


        }

        [HttpDelete]
        public IActionResult DeleteTask(int id)
        {
            Task theTask = dbContext.Tasks.Find(id); //find the task with that id
            dbContext.Tasks.Remove(theTask); //ask the database to remove that task
            dbContext.SaveChanges(); //Save the changes to the database

            return Ok(); //Always return something or the UI will hang waiting for a response.


        }


        public IActionResult Test()
        {
            return Content("Hello FSDI");
        }
    }
}

// SQL
// First need to open connection
// Establish the query
//** Sample ** "insert into Task(id, title, location, important) VALUE(" + obj.id + ", "+ obj.title +", " +obj.location + ", " +obj.important + ");" 

// Then execute the request
// close connection

// Or use ORM

//Task.save(obj);

// select * from Task


