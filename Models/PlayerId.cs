using System;

namespace CoinDay.Models
{
    public sealed class PlayerId : Id
    {
        public PlayerId(string value)
            : base(value)
        { }

        public static PlayerId NewId() 
            => new PlayerId(Guid.NewGuid().ToString().Substring(0, 8));
    }
}
