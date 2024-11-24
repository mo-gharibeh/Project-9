using AnimalShelters_Project.Server.Helpers;
using AnimalShelters_Project.Server.Models;
using AnimalShelters_Project.Server.Repositories;
using hosam.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelters_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private MyDbContext _db;
        private AuthRepository _authRepository;
        private GenerateJwtToken _generateJwtToken;
        public UsersController(MyDbContext db, AuthRepository authRepository, GenerateJwtToken generateJwt)
        {
            _db = db;
            _authRepository = authRepository;
            _generateJwtToken = generateJwt;

        }


        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_db.Users.ToList());
        }

        [HttpGet("GetUserById/{id}")]
        public IActionResult GetUserById(long id)
        {
            var user = _db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [HttpPut("EditUser/{id}")]
        public IActionResult EditUser(int id, [FromForm] UserPutDTO edit)
        {
            var user = _db.Users.Where(a => a.UserId == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }
            user.Email = edit.Email;
            user.UserName = edit.Username;
            _db.Users.Update(user);
            _db.SaveChanges();
            return Ok(user);
        }


        [HttpPut]
        public IActionResult ResetPassword([FromBody] resetPasswordDTO newpass)
        {
            var user = _db.Users.Where(u => u.Email == newpass.Email).FirstOrDefault();
            if (user == null)
            {
                return BadRequest();
            }
            byte[] newHash, newSalt;
            PasswordHasher.CreatePasswordHash(newpass.Password, out newHash, out newSalt);
            user.PasswordHash = newHash;
            user.PasswordSalt = newSalt;
            _db.Users.Update(user);
            _db.SaveChanges();
            return Ok(user);
        }


        [HttpPost("Google")]
        public IActionResult RegisterationFromGoogle([FromBody] RegisterGoogleDTO addUser)
        {
            var userfetch = _authRepository.GetUserByEmail(addUser.email);

            if (userfetch == null)
            {
                userfetch = _authRepository.RegisterUser(new UserRegisterDto
                {
                    Email = addUser.email,
                    Username = addUser.displayName,
                    Password = addUser.uid
                });

            }
            var token = _generateJwtToken.Generate(userfetch.UserId);
            return Ok(new { token });
        }

    }
}
