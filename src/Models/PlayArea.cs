using System;
using System.Collections.Generic;

namespace CoinDay.Models
{
    public class PlayArea
    {
        private int coins;

        private ISet<Card> cards;

        public PlayArea(Player player, int gameSize) 
        {
            Player = player 
                ?? throw new ArgumentNullException(nameof(player));
            if (gameSize < 3 || gameSize > 7)
                throw new ArgumentOutOfRangeException(nameof(gameSize));
            
            if (gameSize < 6)
                coins = 11;
            else if (gameSize < 7)
                coins = 9;
            else
                coins = 7;
            
            cards = new HashSet<Card>();
        }

        public Player Player { get; }

        public int Coins => coins;

        public IEnumerable<Card> Cards => cards;

        public int Score => cards.GetScore() - Coins;

        public static implicit operator string(PlayArea playArea) => playArea.Player.Name;

        public override string ToString() => this;

        public override bool Equals(object obj) =>
            obj is PlayArea playArea
            && playArea.Player == this.Player;

        public override int GetHashCode() => HashCode.Combine(Player);

        public void TakeCard(Card card)
        {
            if (card is null)
            {
                throw new ArgumentNullException(nameof(card));
            }

            cards.Add(card);
            coins += card.Coins;
        }

        public void SpendCoin(Card card)
        {
            if (card is null)
            {
                throw new ArgumentNullException(nameof(card));
            }

            card.AddCoin();
            coins--;
        }
    }
}