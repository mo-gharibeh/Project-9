using AnimalShelters_Project.Server.DTOs.TuqaDTOs;
using AnimalShelters_Project.Server.Models;
using AnimalShelters_Project.Server.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelters_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {


        private readonly MyDbContext _Db;
        //private readonly EmailHelper _emailHelper;
        public ContactController(MyDbContext db/*, EmailHelper emailHelper*/)
        {
            _Db = db;
            //_emailHelper = emailHelper;

        }

        [HttpPost("newmassege")]
        public IActionResult addcontact([FromForm] ContactDTO DTO)
        {
            var messege = new Contact
            {
                Name = DTO.Name,
                Email = DTO.Email,

                Message = DTO.Message,
            };

            _Db.Contacts.Add(messege);
            _Db.SaveChanges();
            return Ok();
        }


        [HttpGet("getallcontact")]
        public IActionResult getallcontact()
        {
            var messege = _Db.Contacts.ToList();
            return Ok(messege);
        }
        //[HttpPost("adminRespone")]
        //public async Task<IActionResult> adminRespone([FromForm] AdminresDto adminres)
        //{
        //    try
        //    {
        //        _emailHelper.SendMessage("to user", adminres.Email, "admin respone", adminres.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine("error");
        //    }

        //    return Ok();
        //}

        [HttpDelete("deleteMessage/{id}")]
        public IActionResult DeleteMessage(int id)
        {
            var message = _Db.Contacts.Find(id);
            if (message == null)
            {
                return NotFound();
            }

            _Db.Contacts.Remove(message);
            _Db.SaveChanges();

            return Ok();
        }

    }
}

