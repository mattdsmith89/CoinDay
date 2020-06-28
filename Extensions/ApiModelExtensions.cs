using System.Linq;

namespace CoinDay.Models
{
    public static class ApiModelExtensions
    {
        public static object ToApiObject(this Player player)
        {
            if (player is null) 
                return null;

            return new
            {
                Id = player.Id.ToString(),
                Name = player.Name,
            };
        }

        public static object ToApiObject(this Game game)
        {
            if (game is null) 
                return null;

            return new
            {
                Id = game.Id.ToString(),
                Players = game.Players.Select(ToApiObject),
                game.CardsLeft,
                CurrentCard = game.CurrentCard.ToApiObject(),
                game.Started,
                CurrentPlayer = game.CurrentPlayer.ToApiObject(),
            };
        }

        public static object ToApiObject(this Card card)
        {
            if (card is null)
                return null;

            return new
            {
                card.Value,
            };
        }
    }
}