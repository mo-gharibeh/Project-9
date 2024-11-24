using AnimalShelters_Project.Server.Models;

namespace AnimalShelters_Project.Server.DTOs
{
    public class ShelterDto
    {


        public string Name { get; set; } = null!;

        public string? Address { get; set; }

        public string? Phone { get; set; }

        public string Email { get; set; } = null!;

        public bool? Verified { get; set; }

        
}
}

