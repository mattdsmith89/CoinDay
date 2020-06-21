using System;
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
            return Ok(new
            {
                Id = player.Id.ToString(),
                Name = player.Name,
            });
        }

        [HttpPost("player")]
        public async Task<IActionResult> Join(PlayerRequest request)
        {
            var player = await gameService.Join(request.Name);
            return Ok(new
            {
                Id = player.Id.ToString(),
                Name = player.Name,
            });
        }
    }
}