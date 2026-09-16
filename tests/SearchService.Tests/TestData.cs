using SearchService.Models;

namespace SearchService.Tests;

public static class TestData
{
    public static Item CreateItem(Action<Item>? configure = null)
    {
        var item = new Item
        {
            Id = Guid.NewGuid().ToString(),
            ReservePrice = 100,
            Seller = "seller",
            Status = "Live",
            CurrentHighBid = 100,
            Make = "Ford",
            Model = "Mustang",
            Description = "Test car",
            Color = "Red",
            Mileage = 1000,
            Year = 2020,
            ImageUrl = "http://image.url.com/image.jpg",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            AuctionEnd = DateTime.UtcNow.AddDays(7)

        };
        configure?.Invoke(item);
        return item;
    }
}