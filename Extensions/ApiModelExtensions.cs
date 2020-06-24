using System.Linq;

namespace CoinDay.Models
{
    public static class ApiModelExtensions
    {
        public static object ToApiObject(this Player player)
        {
            if (player is null) return null;

            return new
            {
                Id = player.Id.ToString(),
                Name = player.Name,
            };
        }

        public static object ToApiObject(this Game game)
        {
            if (game is null) return null;

            return new
            {
                Id = game.Id.ToString(),
                Players = game.Players.Select(ToApiObject),
            };
        }
    }
}