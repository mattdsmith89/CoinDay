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

        public static object ToApiObject(this Room room)
        {
            if (room is null) return null;

            return new
            {
                Id = room.Id.ToString(),
                Players = room.Players.Select(ToApiObject),
            };
        }
    }
}