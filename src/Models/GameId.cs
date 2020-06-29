using System;

namespace CoinDay.Models
{
    public sealed class GameId : Id
    {
        public GameId(string value)
            : base(value)
        { }

        public static GameId NewId()
            => new GameId(Guid.NewGuid().ToString().Substring(0, 8));
    }
}