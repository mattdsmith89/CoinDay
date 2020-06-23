using System;

namespace CoinDay.Models
{
    public class RoomId
    {
        private readonly string _value;

        public RoomId(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException(nameof(value));
            }

            _value = value;
        }

        public static RoomId NewId() => new RoomId(Guid.NewGuid().ToString());

        public static implicit operator string(RoomId roomId) => roomId._value;

        public override string ToString() => _value.ToString();

        public override bool Equals(object obj) => 
            obj is RoomId id && _value == id._value;

        public override int GetHashCode() => HashCode.Combine(_value);

        public static bool operator ==(RoomId r1, RoomId r2) => r1.Equals(r2);

        public static bool operator !=(RoomId r1, RoomId r2) => !r1.Equals(r2);
    }
}