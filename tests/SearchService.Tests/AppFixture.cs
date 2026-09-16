using System.ComponentModel;
using Alba;
using DotNet.Testcontainers.Builders;
using Microsoft.AspNetCore.Hosting;
using Wolverine;
using IContainer = DotNet.Testcontainers.Containers.IContainer;

namespace SearchService.Tests;

public class AppFixture: IAsyncLifetime
{
    private readonly IContainer _meilisearchContainer
        = new ContainerBuilder("getmeili/meilisearch:latest")
            .WithPortBinding(7700, true)
            .WithEnvironment("MEILI_MASTER_KEY", "masterkey")
            .WithWaitStrategy(Wait.ForUnixContainer()
                .UntilHttpRequestIsSucceeded(request =>
                    request.ForPath("/health").ForPort(7700)))
            .Build();

    public IAlbaHost Host { get; private set; }
    
    public async Task InitializeAsync()
    {
        await _meilisearchContainer.StartAsync();
        
        var meilisearchUrl =
            $"http://{_meilisearchContainer.Hostname}:{_meilisearchContainer.GetMappedPublicPort(7700)}";
        
        Host = await AlbaHost.For<Program>(builder =>
        {
            builder.UseEnvironment("Test");
            builder.UseSetting("MeiliSearch:Url", meilisearchUrl);
            builder.UseSetting("MeiliSearch:ApiKey", "masterkey");
            builder.ConfigureServices(services =>
            {
                services.RunWolverineInSoloMode();
                services.DisableAllExternalWolverineTransports();
            });
        });
    }

    public async Task DisposeAsync()
    {
        await Host.StopAsync();
        await Host.DisposeAsync();
        await _meilisearchContainer.DisposeAsync();
    }
}
[CollectionDefinition("search-service")]
public class SearchServiceCollection : ICollectionFixture<AppFixture>;