using AnimalShelters_Project.Server.Models;

namespace AnimalShelters_Project.Server.DTOs.hosamDTOs
{
    public class GetAnimalDTO
    {

        public string Name { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public string Status { get; set; } = null!;

    }
}
