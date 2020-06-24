using System;
using System.Collections.Generic;

namespace CoinDay.Models
{
    public class Game
    {
        private readonly ISet<Player> players;

        public Game(Player initial)
        {
            if (initial is null)
            {
                throw new ArgumentNullException(nameof(initial));
            }

            Id = GameId.NewId();
            players = new HashSet<Player> { initial };
        }

        public IEnumerable<Player> Players => players;

        public GameId Id { get; set; }

        public static implicit operator string(Game game) 
            => string.Join(", ", game.Players);

        public override string ToString() => this;

        public override bool Equals(object obj) =>
            obj is Game game 
            && game.Id == this.Id;

        public override int GetHashCode() => HashCode.Combine(Id);
    }
}