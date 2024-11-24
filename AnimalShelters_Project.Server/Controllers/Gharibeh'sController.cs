using AnimalShelters_Project.Server.DTOs.GharibehDtos;
using AnimalShelters_Project.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelters_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Gharibeh_sController : ControllerBase
    {
        private readonly MyDbContext _db;
        public Gharibeh_sController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("getAllPosts")]
        public IActionResult getAllPosts() {
            var posts = _db.Posts.ToList();
            return Ok(posts);
        }


        // add post from form api
        [HttpPost("addPost")]
        public async Task<IActionResult> addPost([FromForm] PostFormDto postForm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var fileImage = Path.Combine(folder, postForm.Image.FileName);
            using (var stream = new FileStream(fileImage, FileMode.Create))
            {
                await postForm.Image.CopyToAsync(stream);

            }
            var post = new Post
            {
                UserId = postForm.UserId,
                Content = postForm.Content,
                Image = postForm.Image.FileName,
                Title = postForm.Title,

            };
            _db.Posts.Add(post);
            _db.SaveChanges();
            return Ok(post);

        }

        // get all posts when Flag is true 
        [HttpGet("allPost")]
        public IActionResult GetAllPost()
        {
            var post = _db.Posts.Where(p => p.Flag == true).Select(t => new
            {
                id = t.Id,
                Content = t.Content,
                Title = t.Title,
                Image = t.Image,
                UserName = t.User.UserName,
                likesCount = t.Likes.Where(l => l.Flag == true).Count(),

            }).ToList();
            return Ok(post);
        }

        // POST: api/likes
        [HttpPost("addLike")]
        public IActionResult LikePost([FromBody] LikeDto likeDto)
        {
            // Check if the like already exists
            var existingLike = _db.Likes
                .FirstOrDefault(l => l.PostId == likeDto.PostId && l.UserId == likeDto.UserId);

            if (existingLike != null)
            {
                // Toggle the like flag (like/unlike)
                existingLike.Flag = !existingLike.Flag;
                _db.SaveChanges();
                return Ok(existingLike);
            }
            else
            {
                // Add a new like
                var like = new Like
                {
                    PostId = likeDto.PostId,
                    UserId = likeDto.UserId,
                    Flag = true
                };
                _db.Likes.Add(like);
                _db.SaveChanges();
                return Ok(like);
            }
        }

        // GET: api/likes/{postId}
        [HttpGet("countLikes/{postId}")]
        public IActionResult GetLikesForPost(int postId)
        {
            var likeCount = _db.Likes
                .Where(l => l.PostId == postId && l.Flag == true)
                .Count();

            return Ok(likeCount);
        }


        // POST: api/comments
        [HttpPost("addComment")]
        public IActionResult AddComment([FromBody] CommentDto commentDto)
        {
            var comment = new Comment
            {
                PostId = commentDto.PostId,
                UserId = commentDto.UserId,
                Content = commentDto.Content
            };
            _db.Comments.Add(comment);
            _db.SaveChanges();
            return Ok(comment);
        }

        // GET: api/comments/{postId}
        [HttpGet("displayComments/{postId}")]
        public IActionResult GetCommentsForPost(long postId)
        {
            var comments = _db.Comments
                .Where(c => c.PostId == postId)
                .Select(c => new
                {
                    c.Id,
                    c.Content,
                    UserName = _db.Users.FirstOrDefault(u => u.UserId == c.UserId).UserName
                }).ToList();

            return Ok(comments);
        }


        // POST: api/replies
        [HttpPost("addReplay")]
        public IActionResult AddReply([FromBody] ReplyDto replyDto)
        {
            var reply = new Reply
            {
                CommentId = replyDto.CommentId,
                UserId = replyDto.UserId,
                Content = replyDto.Content
            };
            _db.Replies.Add(reply);
            _db.SaveChanges();
            return Ok(reply);
        }

        // GET: api/replies/{commentId}
        [HttpGet("displayReplaies/{commentId}")]
        public IActionResult GetRepliesForComment(long commentId)
        {
            var replies = _db.Replies
                .Where(r => r.CommentId == commentId)
                .Select(r => new
                {
                    r.Id,
                    r.Content,
                    UserName = _db.Users.FirstOrDefault(u => u.UserId == r.UserId).UserName
                }).ToList();

            return Ok(replies);
        }





    }
}
