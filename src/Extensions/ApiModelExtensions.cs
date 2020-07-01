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
                game.CardsLeft,
                game.Started,
                Players = game.Players.Select(ToApiObject),
                PlayAreas = game.PlayAreas.Select(ToApiObject),
                CurrentCard = game.CurrentCard.ToApiObject(),
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
                card.Coins,
            };
        }

        public static object ToApiObject(this PlayArea playArea)
        {
            if (playArea is null)
                return null;
            
            return new
            {
                Player = playArea.Player.ToApiObject(),
                Cards = playArea.Cards.Select(ToApiObject),
                Score = playArea.Score,
                Coins = playArea.Coins,
            };
        }
    }
}