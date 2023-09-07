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
                Ready = player.Ready,
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
                State = game.State.ToString(),
                Players = game.Players.Select(ToApiObject),
                PlayAreas = game.PlayAreas.Select(ToApiObject),
                PlayOrder = game.PlayOrder.Select(x => x.ToString()),
                CurrentCard = game.CurrentCard.ToApiObject(),
                CurrentPlayer = game.CurrentPlayer.ToApiObject(),
                Leaderboard = game.Leaderboard.Select(x => new 
                {
                    Name = x.Key.Name,
                    Wins = x.Value,
                }),
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