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

        [HttpGet()]
        public IActionResult GetGames()
        {
            return Ok(gameService.Games.Select(game => game.ToApiObject()));
        }

        [HttpPost()]
        public async Task<IActionResult> NewGame(GameRequest request)
        {
            var game = await gameService.NewGame(new PlayerId(request.PlayerId));
            if (game is null) return NotFound();
            return Ok(game.ToApiObject());
        }

        [HttpPost("player")]
        public async Task<IActionResult> NewPlayer(PlayerRequest request)
        {
            var player = await gameService.NewPlayer(request.Name);
            return Ok(player.ToApiObject());
        }

        [HttpGet("player/{id}")]
        public IActionResult GetPlayer(string id)
        {
            var player = gameService.GetPlayer(new PlayerId(id));
            if (player is null) return NotFound();
            return Ok(player.ToApiObject());
        }
    }
}
