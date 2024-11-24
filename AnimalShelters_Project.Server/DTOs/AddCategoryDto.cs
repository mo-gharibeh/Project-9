namespace AnimalShelters_Project.Server.DTOs
{
    public class AddCategoryDto
    {
        public string? Species { get; set; }

        public IFormFile? Image { get; set; }
    }
}
