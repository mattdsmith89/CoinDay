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
        private readonly IHubContext<GameHub> gameHub;

        public GameService(IHubContext<GameHub> gameHub)
        {
            players = new HashSet<Player>();
            this.gameHub = gameHub 
                ?? throw new ArgumentNullException(nameof(gameHub));
        }

        public IEnumerable<Player> Players => players;

        public async Task<Player> Join(string name)
        {
            var id = new PlayerId(Guid.NewGuid().ToString());
            var player = new Player(id, name);
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
    }
}