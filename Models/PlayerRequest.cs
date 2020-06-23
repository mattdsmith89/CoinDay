using System.ComponentModel.DataAnnotations;

namespace CoinDay.Models
{
    public class PlayerRequest
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}