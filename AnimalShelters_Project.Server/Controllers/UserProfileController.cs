using AnimalShelters_Project.Server.DTOs.hosamDTOs;
using AnimalShelters_Project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AnimalShelters_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly MyDbContext _context;

        public UserProfileController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetUserProfile(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }



        [HttpGet("getImages/{ImageName}")]

        public IActionResult getImage(string ImageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "images", ImageName);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/jpeg");

            }
            return NotFound();


        }




        [HttpPut("UpdateUserProfile/{id}")]
        public async Task<IActionResult> UpdateUserProfile(int id, [FromForm] UserProfileDTO updatedUserDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.UserName = updatedUserDto.UserName;
            user.Email = updatedUserDto.Email;

          
            if (updatedUserDto.Image != null)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                var imageFilePath = Path.Combine(folder, updatedUserDto.Image.FileName);
                using (var stream = new FileStream(imageFilePath, FileMode.Create))
                {
                    await updatedUserDto.Image.CopyToAsync(stream);
                }
                user.Image = updatedUserDto.Image.FileName;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }




        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }



        [HttpGet("applications/{userId}")]
        public IActionResult GetApplicationsByUserId(int userId)
        {
            var apps =  _context.AdoptionApplications
                .Where(o => o.UserId == userId)
                .Include(o => o.Animal)
                .ToList();

            var appsDTOs = apps.Select(o => new GetAnimalDTO
            {
                Name = o.Animal.Name,
                ImageUrl = o.Animal.ImageUrl,
                Status = o.Status
            }).ToList();

            return Ok(appsDTOs);
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_context.Users.ToList());
        }
    }
}
