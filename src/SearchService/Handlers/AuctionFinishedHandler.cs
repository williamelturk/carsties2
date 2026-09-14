using AuctionService.Data;
using Contracts;
using Meilisearch;
using SearchService.Models;
using Spectre.Console;

namespace SearchService.Handlers;

public class AuctionFinishedHandler
{
    public async Task Handle(AuctionFinished message, MeilisearchClient client)
    {
        var auction = await client.Index("items").GetDocumentAsync<Item>(message.AuctionId)
                      ?? throw new InvalidOperationException("Auction not found");

        if (message.ItemSold)
        {
            auction.Winner = message.Winner;
            auction.SoldAmount = message.Amount;
        }

        auction.Status = "Finished";
        
        await client.Index("items").UpdateDocumentsAsync([auction]);
    }
    
}