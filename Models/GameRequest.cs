using System.ComponentModel.DataAnnotations;

namespace CoinDay.Models
{
    public class GameRequest
    {
        [Required]
        public string PlayerId { get; set; }
    }    
}