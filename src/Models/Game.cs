using System;
using System.Collections.Generic;
using System.Linq;

namespace CoinDay.Models
{
    public class Game
    {
        private readonly ISet<Player> players;
        private readonly ISet<PlayArea> playAreas;
        private readonly ISet<PlayerId> playOrder;
        private readonly Queue<Card> deck;
        private bool started;
        private int turn = 0;

        public Game(Player initial)
        {
            if (initial is null)
                throw new ArgumentNullException(nameof(initial));

            Id = GameId.NewId();
            started = false;
            deck = new Queue<Card>();
            players = new HashSet<Player> { initial };
            playAreas = new HashSet<PlayArea>();
            playOrder = new HashSet<PlayerId>();
        }

        public IEnumerable<Player> Players
            => players;

        public IEnumerable<PlayArea> PlayAreas
            => playAreas;

        public Card CurrentCard
            => CardsLeft > 0 ? deck.Peek() : null;

        public Player CurrentPlayer
            => started 
                ? players.FirstOrDefault(x => x.Id == playOrder.ElementAt(turn % playOrder.Count)) 
                : null;

        public int? CardsLeft
            => started ? deck.Count - 1 : (int?)null;

        public bool Started
            => started;

        public GameId Id { get; }

        public static implicit operator string(Game game)
            => string.Join(", ", game.Players);

        public override string ToString() => this;

        public override bool Equals(object obj) =>
            obj is Game game
            && game.Id == this.Id;

        public override int GetHashCode() => HashCode.Combine(Id);

        public void AddPlayer(Player player)
        {
            if (player is null)
                throw new ArgumentNullException(nameof(player));
            if (players.Count > 6)
                throw new InvalidOperationException("Too many players");
            if (players.Contains(player))
                throw new InvalidOperationException("Player already in game");

            players.Add(player);
        }

        public void StartGame()
        {
            if (started)
                return;
            if (players.Count < 3 || players.Count > 7)
                return;

            deck.Enqueue(Card.NewDeck().Shuffle().Take(24));
            playAreas.Clear();
            playOrder.Clear();
            foreach (var player in players)
            {
                playAreas.Add(new PlayArea(player, players.Count));
                playOrder.Add(player.Id);
            }
            playOrder.Shuffle();
            turn = 0;
            started = true;
        }

        public void TakeCard(PlayerId playerId)
        {
            if (!started)
                return;

            var playArea = playAreas.FirstOrDefault(x => x.Player.Id == playerId);
            if (playArea is null)
                return;

            if (CurrentPlayer != playArea.Player)
                return;

            var card = deck.Dequeue();
            playArea.TakeCard(card);
        }

        public void AddCoin(PlayerId playerId)
        {
            if (!started)
                return;

            var playArea = playAreas.FirstOrDefault(x => x.Player.Id == playerId);
            if (playArea is null)
                return;

            if (CurrentPlayer != playArea.Player)
                return;

            playArea.SpendCoin(CurrentCard);
            NextTurn();
        }

        private void NextTurn()
        {
            turn++;
        }
    }
}