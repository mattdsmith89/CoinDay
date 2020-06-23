using System.ComponentModel.DataAnnotations;

namespace CoinDay.Models
{
    public class RoomRequest
    {
        [Required]
        public string PlayerId { get; set; }
    }    
}