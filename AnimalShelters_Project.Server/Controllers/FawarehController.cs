using AnimalShelters_Project.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelters_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FawarehController : ControllerBase
    {
        private readonly MyDbContext _db;
        public FawarehController(MyDbContext db)
        {
            _db = db;
        }


        [HttpPut("AcceptPost/{id}")]

        public IActionResult AcceptPost(int id)
        {
            var post = _db.Posts.Where(p => p.Id == id).FirstOrDefault();

            if (post == null)
            {
                return NotFound($"No post found with id {id}");

            }

            if (post.Flag == true)
            {
                post.Flag = false;


            }

            else
            {
                post.Flag = true;

            }

            _db.Posts.Update(post);
            _db.SaveChanges();


            return Ok(post);
        }

        [HttpGet("getImage/{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", imageName);


            if (System.IO.File.Exists(imagePath))
            {
                return PhysicalFile(imagePath, "image/jpeg"); // أو "image/png" حسب نوع الصورة
            }

            return NotFound($"Image with named {imageName} not found");
        }


        [HttpGet("CheckIfPostIsLiked/{userId}/{postId}")]
        public IActionResult CheckIfPostIsLiked(int userId, int postId)
        {
            var postLiked = _db.Likes.Where(p => p.UserId == userId && p.PostId == postId).FirstOrDefault();

            if (postLiked == null)
            {
                return Ok("NotLiked");
            }

            return Ok("Liked");


        }
    }
}
