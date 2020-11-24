
using Microsoft.AspNetCore.Mvc;
using Class2_FS_Calendar.Models;
using System.Collections.Generic;


namespace Class2_FS_Calendar.Controllers
{

    public class ApiController : Controller
    {

        [HttpPost]
        public IActionResult SaveTask([FromBody] Task theTask)
        {
            //get the object
            System.Console.WriteLine("Saving Tasks");

            //save the object

            //set the ID
            theTask.Id = 1;

            //return the object
            return Json(theTask);
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            var list = new List<Task>();
            var myTask = new Task();
            myTask.Title = "Hardcoded";
            myTask.Important = true;
            myTask.Description = "This is a test task";
            myTask.Location = "Backend";
            myTask.User = "Raven";

            list.Add(myTask);
            return Json(list);
            

        }
        public IActionResult Test()
        {
            return Content("Hello FSDI");
        }
    }
}
