using AuctionService.Data;
using Contracts;

namespace AuctionService.Handlers;

public class BidPlacedHandler
{
    public async Task Handle(BidPlaced message, AuctionDbContext dbContext)
    {
        
        var auction = await dbContext.Auctions.FindAsync(message.AuctionId)
                      ?? throw new InvalidOperationException("Auction not found");

        if (auction.CurrentHighBid == null && message.BidStatus.Contains("Accepted") ||
            message.BidStatus.Contains("Accepted") && message.Amount > auction.CurrentHighBid)
        {
            auction.CurrentHighBid = message.Amount;
            await dbContext.SaveChangesAsync();
        }
    }
}