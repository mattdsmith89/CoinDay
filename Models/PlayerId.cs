using System;

namespace CoinDay.Models
{
    public class PlayerId
    {
        private readonly string _value;

        public PlayerId(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException(nameof(value));
            }

            _value = value;
        }
        public static implicit operator string(PlayerId playerId) => playerId._value;

        public override string ToString() => _value.ToString();

        public override bool Equals(object obj) => 
            obj is PlayerId id && _value == id._value;

        public override int GetHashCode() => HashCode.Combine(_value);

        public static bool operator ==(PlayerId p1, PlayerId p2) => p1.Equals(p2);

        public static bool operator !=(PlayerId p1, PlayerId p2) => !p1.Equals(p2);
    }
}