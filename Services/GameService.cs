using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoinDay.Hubs;
using CoinDay.Models;
using Microsoft.AspNetCore.SignalR;

namespace CoinDay.Services
{
    public class GameService
    {
        private readonly ISet<Player> players;
        private readonly ISet<Game> games;
        private readonly IHubContext<GameHub> gameHub;

        public GameService(IHubContext<GameHub> gameHub)
        {
            players = new HashSet<Player>();
            games = new HashSet<Game>();
            this.gameHub = gameHub 
                ?? throw new ArgumentNullException(nameof(gameHub));
        }

        public IEnumerable<Player> Players => players;

        public IEnumerable<Game> Games => games;

        public async Task<Player> NewPlayer(string name)
        {
            var player = new Player(name);
            players.Add(player);
            await gameHub.Clients.All.SendAsync("Message", new Message
            {
                Name = "NewPlayer",
                Body = player.ToString(),
            });
            await gameHub.Clients.All.SendAsync("Message", new Message
            {
                Name = "AllPlayers",
                Body = Players.Select(x => x.ToString()),
            });
            return player;
        }

        public Player GetPlayer(PlayerId id)
        {
            return players.FirstOrDefault(x => x.Id == id);
        }

        public async Task<Game> NewGame(PlayerId initialPlayer)
        {
            var player = Players.FirstOrDefault(x => x.Id == initialPlayer);
            if (player is null) return null;
            var game = new Game(player);
            games.Add(game);
            await gameHub.Clients.All.SendAsync("Message", new Message
            {
                Name = "NewGame",
                Body = game.Id.ToString(),
            });
            return game;
        }

        public async Task<Game> JoinGame(GameId gameId, PlayerId playerId)
        {
            var game = games.FirstOrDefault(x => x.Id == gameId);
            if (game is null || game.Players.Count() > 5) return null;

            var player = GetPlayer(playerId);
            var isInGame = games.Any(x => x.Players.Contains(player));
            if (isInGame) return null;

            game.AddPlayer(player);
            await gameHub.Clients.All.SendAsync("Message", new Message
            {
                Name = "GameUpdated",
                Body = game.Id.ToString(),
            });
            return game;
        }
    }
}