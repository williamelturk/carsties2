using System.Reflection;
using DbUp;

namespace BidService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
        var connectionString = config.GetConnectionString("BidDbConnection");
        
        EnsureDatabase.For.PostgresqlDatabase(connectionString);
        
        var upgrader = DeployChanges.To
            .PostgresqlDatabase(connectionString)
            .WithScriptsEmbeddedInAssemblies([Assembly.GetExecutingAssembly()])
            .LogToConsole()
            .Build();

        var result = upgrader.PerformUpgrade();
        
        if(!result.Successful)
        {
            throw result.Error;
        }
    }
}