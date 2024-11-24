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
    public class AdminsController(IConfiguration config, GenerateJwtToken generateJwt, MyDbContext context, AuthRepository authRepository)
   : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromForm] UserLoginDto admin)
        {

            var dbadmin = context.Admins.FirstOrDefault(u => u.Email == admin.Email);
            if (dbadmin == null || !PasswordHasher.VerifyPasswordHash(admin.Password, dbadmin.PasswordHash, dbadmin.PasswordSalt))
            {
                return Unauthorized(new { message = "Bad Credentials" });
            }
            var token = generateJwt.Generate(dbadmin.Id);
            return Ok(new { token = token, id = dbadmin.Id });
        }



        [HttpPost("Register")]
        public IActionResult AddUser([FromForm] AdminRegisterRequestDTO addAdmin)
        {
            var admin = context.Admins.FirstOrDefault(a => a.Email == addAdmin.Email);
            if (admin != null)
            {
                return BadRequest("email already used");
            }
            byte[] hash, salt;
            PasswordHasher.CreatePasswordHash(addAdmin.Password, out hash, out salt);
            var newuser = new Admin()
            {
                Email = addAdmin.Email,
                PasswordSalt = salt,
                PasswordHash = hash
            };
            context.Admins.Add(newuser);
            context.SaveChanges();
            return Ok(newuser);
        }
    }
}
