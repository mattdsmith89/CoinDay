using System;
using System.Linq;
using System.Threading.Tasks;
using CoinDay.Models;
using CoinDay.Services;
using Microsoft.AspNetCore.Mvc;

namespace CoinDay.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        private readonly GameService gameService;

        public GameController(GameService gameService)
        {
            this.gameService = gameService ?? throw new ArgumentNullException(nameof(gameService));
        }

        [HttpGet("player/{id}")]
        public IActionResult GetPlayer(string id)
        {
            var player = gameService.GetPlayer(new PlayerId(id));
            if (player is null) return NotFound();
            return Ok(player.ToApiObject());
        }

        [HttpPost("player")]
        public async Task<IActionResult> Join(PlayerRequest request)
        {
            var player = await gameService.Join(request.Name);
            return Ok(player.ToApiObject());
        }

        [HttpGet("room")]
        public IActionResult GetRooms()
        {
            return Ok(gameService.Rooms.Select(room => room.ToApiObject()));
        }

        [HttpPost("room")]
        public async Task<IActionResult> CreateRoom(RoomRequest request)
        {
            var room = await gameService.CreateRoom(new PlayerId(request.PlayerId));
            if (room is null) return NotFound();
            return Ok(room.ToApiObject());
        }
    }
}