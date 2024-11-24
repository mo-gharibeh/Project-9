namespace AnimalShelters_Project.Server.DTOs.GharibehDtos
{
    public class PostFormDto
    {
        public int? UserId { get; set; }

        public string? Content { get; set; }

        public IFormFile? Image { get; set; }

        public string? Title { get; set; }
    }
}
