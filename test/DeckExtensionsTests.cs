using System.Collections.Generic;
using System.Linq;
using CoinDay.Models;
using Xunit;

namespace CoinDay.Test
{
    public class DeckExtensionsTests
    {
        [Theory]
        [MemberData(nameof(DeckScoreData))]
        public void DeckScore(int[] cardValues, int expectedScore)
        {
            var cards = cardValues.Select(x => new Card(x));

            Assert.Equal(expectedScore, cards.GetScore());
        }

        public static IEnumerable<object[]> DeckScoreData => new[]
        {
            new object[] { new[] { 3, 4, 5 }, 3 },
            new object[] { new[] { 3, 4, 5, 7, 8, 9 }, 10 },
            new object[] { new[] { 3, 5, 7, 9 }, 24 },
            new object[] { new[] { 4, 34, 5 }, 38 },
        };
    }
}
