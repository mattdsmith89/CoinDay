using System;
using System.Text.Json.Serialization;

namespace CoinDay.Models
{
    public class Player
    {
        public Player(PlayerId id, string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException($"'{nameof(name)}' cannot be null or whitespace", nameof(name));
            }

            Id = id ?? throw new ArgumentNullException(nameof(id));
            Name = name;
        }

        public string Name { get; set; }

        public PlayerId Id { get; set; }

        public static implicit operator string(Player player) => player.Name;

        public override string ToString() => Name;

        public override bool Equals(object obj) =>
            obj is Player player 
            && player.Id == this.Id;

        public override int GetHashCode() => HashCode.Combine(Id);
    }
}