using Microsoft.EntityFrameworkCore;

namespace Class2_FS_Calendar.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        //which of my models will become tables on the DB
        public DbSet<Task> Tasks {get; set;}

    }
}

/*
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
*/

/*
            Run migrations everytime something changes on the models

            - dotnet ef migrations add <someName>
            - dotnet ef database update
        */

