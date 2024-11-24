using AnimalShelters_Project.Server.Models;

namespace AnimalShelters_Project.Server.DTOs
{
    public class AnimalDto
    {
       
        public string Name { get; set; } = null!;

        public long? CategoryId { get; set; }

        public string? Breed { get; set; }

        public int Age { get; set; }

        public int? ShelterId { get; set; }

        public string? Size { get; set; }

        public string? Temperament { get; set; }

        public string? SpecialNeeds { get; set; }

        public string? AdoptionStatus { get; set; }

        public IFormFile? ImageUrl { get; set; }

      
       
    }
}
