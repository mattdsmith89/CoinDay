using System;
using System.Collections.Generic;
using System.Linq;

namespace CoinDay.Models
{
    public class Room
    {
        private readonly ISet<Player> players;

        public Room(Player initial)
        {
            if (initial is null)
            {
                throw new ArgumentNullException(nameof(initial));
            }

            Id = RoomId.NewId();
            players = new HashSet<Player> { initial };
        }

        public IEnumerable<Player> Players => players;

        public RoomId Id { get; set; }

        public static implicit operator string(Room room) 
            => string.Join(", ", room.Players);

        public override string ToString() => this;

        public override bool Equals(object obj) =>
            obj is Room room 
            && room.Id == this.Id;

        public override int GetHashCode() => HashCode.Combine(Id);
    }
}