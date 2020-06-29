using System;
using System.Collections.Generic;

namespace CoinDay.Models
{
    public sealed class Card
    {
        public Card(int value)
        {
            if (value < 3 || value > 35)
                throw new ArgumentOutOfRangeException(nameof(value));

            this.Value = value;
        }

        public int Value { get; }


        public override bool Equals(object obj) =>
            obj is Card card && Value == card.Value;

        public override int GetHashCode() => HashCode.Combine(Value);

        public static bool operator ==(Card card1, Card card2) => card1.Equals(card2);

        public static bool operator !=(Card card1, Card card2) => !card1.Equals(card2);

        public static IEnumerable<Card> NewDeck()
        {
            for (int i = 3; i < 36; i++)
            {
                yield return new Card(i);
            }
        }
    }
}