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
        private readonly ISet<Room> rooms;
        private readonly IHubContext<GameHub> gameHub;

        public GameService(IHubContext<GameHub> gameHub)
        {
            players = new HashSet<Player>();
            rooms = new HashSet<Room>();
            this.gameHub = gameHub 
                ?? throw new ArgumentNullException(nameof(gameHub));
        }

        public IEnumerable<Player> Players => players;

        public IEnumerable<Room> Rooms => rooms;

        public async Task<Player> Join(string name)
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

        public async Task<Room> CreateRoom(PlayerId initialPlayer)
        {
            var player = Players.FirstOrDefault(x => x.Id == initialPlayer);
            if (player is null) return null;
            var room = new Room(player);
            rooms.Add(room);
            await gameHub.Clients.All.SendAsync("Message", new Message
            {
                Name = "NewRoom",
                Body = room.Id,
            });
            return room;
        }
    }
}