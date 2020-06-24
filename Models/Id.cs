using System;

namespace CoinDay.Models
{
    public class Id
    {
        private readonly string _value;

        public Id(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException(nameof(value));
            }

            _value = value;
        }

        public static implicit operator string(Id id) => id._value;

        public override string ToString() => _value.ToString();

        public override bool Equals(object obj) =>
            obj is Id id && _value == id._value;

        public override int GetHashCode() => HashCode.Combine(_value);

        public static bool operator ==(Id id1, Id id2) => id1.Equals(id2);

        public static bool operator !=(Id id1, Id id2) => !id1.Equals(id2);
    }
}