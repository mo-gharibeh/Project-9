namespace AnimalShelters_Project.Server.DTOs.hosamDTOs
{
    public class UserProfileDTO
    {

        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public IFormFile? Image { get; set; }
    }
}
