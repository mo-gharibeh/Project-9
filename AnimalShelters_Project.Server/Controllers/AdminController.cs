using AnimalShelters_Project.Server.DTOs;
using AnimalShelters_Project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto;
using System.Drawing;
using System.Numerics;

namespace AnimalShelters_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;
        public AdminController(MyDbContext context)
        {
            _context = context;

        }
        [HttpGet("getAllAnimals")]
        public IActionResult GetAnimals()
        {

            var animals = _context.Animals.ToList();
            if (animals != null)
            {

                return Ok(animals);
            }
            return NoContent();

        }

        [HttpGet("GetCategoryByID/{id}")]
        public IActionResult getcategoryId(int id)
        {
            if (id <=0)
            {
                return BadRequest();

            }
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
                return NoContent();
            return Ok(category);
        }

        [HttpGet("GetShelterByID/{id}")]
        public IActionResult getshelterId(int id)
        {
            if (id <= 0)
            {
                return BadRequest();

            }
            var shelter = _context.Shelters.FirstOrDefault(c => c.ShelterId == id);
            if (shelter == null)
                return NoContent();
            return Ok(shelter);
        }

        [HttpGet("AnimalsbyCategoryId/{id}")]

        public IActionResult AnimalsCat(int id)
        {

            var animals = _context.Animals.Where(a => a.CategoryId == id).ToList();

            if (id <= 0)
            {
                return BadRequest();

            }
            if (animals != null)
            {
                return Ok(animals);

            }

            return NotFound();


        }
        [HttpGet("getAnimalsbyID/{id}")]
        public IActionResult getanimalsbyID (int id ){ 
        if (id <= 0)
            {
                return BadRequest();
            }
        var animals=_context.Animals.FirstOrDefault(a => a.AnimalId == id);
            if (animals != null)
                return Ok(animals);
            return NotFound();
        
        
        }

        [HttpGet("AnimalsbyShelterId/{id}")]

        public IActionResult AnimalsShelter(int id)
        {

            var animals = _context.Animals.Where(a => a.ShelterId == id).ToList();

            if (id <= 0)
            {
                return BadRequest();

            }
            if (animals != null)
            {
                return Ok(animals);

            }

            return NotFound();


        }



        [HttpPut("updateAnimals/{id}")]
        public IActionResult updateAnimals(int id, [FromForm] AnimalDto animal)
        {
            var newedit = _context.Animals.Where(p => p.AnimalId == id).FirstOrDefault();

            if (newedit == null)
            {
                return NotFound("Animal not found.");
            }

            if (animal.ImageUrl != null && animal.ImageUrl.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + animal.ImageUrl.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    animal.ImageUrl.CopyTo(fileStream);
                }

                
                newedit.Name = animal.Name;
                newedit.CategoryId = animal.CategoryId;
                newedit.Breed = animal.Breed;
                newedit.Age = animal.Age;
                newedit.ShelterId = animal.ShelterId;
                newedit.Size = animal.Size;
                newedit.Temperament = animal.Temperament;
                newedit.SpecialNeeds = animal.SpecialNeeds;
                newedit.ImageUrl = $"/images/{uniqueFileName}";
                newedit.AdoptionStatus = animal.AdoptionStatus;

                
                _context.Animals.Update(newedit);
                _context.SaveChanges();

                return Ok(newedit);
            }

            return BadRequest("there is an error in updated animals");
        }

        [HttpDelete("deleteAnimal/{id}")]
        public IActionResult DeleteAnimal(int id)
        {
            var animal = _context.Animals.Where(a => a.AnimalId == id).FirstOrDefault();

            if (animal == null)
            {
                return NotFound("Animal not found.");
            }

            // Manually remove all related adoption applications
            var adoptionApplications = _context.AdoptionApplications.Where(aa => aa.AnimalId == id).ToList();
            _context.AdoptionApplications.RemoveRange(adoptionApplications);

            // Now remove the animal
            _context.Animals.Remove(animal);

            _context.SaveChanges();

            return NoContent();
        }




        [HttpPost("addAnimals")]
        public IActionResult addAnimal([FromForm] AnimalDto animal)
        {


            if (animal.ImageUrl != null && animal.ImageUrl.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");



                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + animal.ImageUrl.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    animal.ImageUrl.CopyToAsync(fileStream);
                }



                var newAnimal = new Animal
                {
                    Name = animal.Name,
                    CategoryId = animal.CategoryId,
                    Breed = animal.Breed,
                    Age = animal.Age,
                    ShelterId = animal.ShelterId,
                    Size = animal.Size,
                    Temperament = animal.Temperament,
                    SpecialNeeds = animal.SpecialNeeds,
                    ImageUrl = $"/images/{uniqueFileName}",
                    AdoptionStatus = animal.AdoptionStatus
                };

                _context.Animals.Add(newAnimal);
                _context.SaveChanges();
                return Ok(newAnimal);
            }


        
            
            return BadRequest("Invalid data or missing image.");
        }



        [HttpGet("getAllAShelters")]
        public IActionResult GetShelters()
        {

            var shelter = _context.Shelters.ToList();
            if (shelter != null)
            {

                return Ok(shelter);
            }
            return NoContent();

        }


        [HttpPost("addShelters")]
        public IActionResult addShelter([FromForm] ShelterDto shelter)
        {



            var newShelter = new Shelter
            {
                Name= shelter.Name,
                Address= shelter.Address,
                Phone= shelter.Phone,
                Email= shelter.Email,
                Verified= shelter.Verified

            };

            _context.Shelters.Add(newShelter);
            _context.SaveChanges();
            return Ok(newShelter);
        }




        [HttpPut("updateShelter/{id}")]
        public IActionResult updateShelters(int id, [FromForm] ShelterDto shelter)
        {
            var newedit = _context.Shelters.Where(p => p.ShelterId == id).FirstOrDefault();

            if (newedit == null)
            {
                return NotFound("shelters not found.");
            }

           
               
                newedit.Name = shelter.Name;
               newedit.Address = shelter.Address;
               newedit.Phone = shelter.Phone;
               newedit.Email = shelter.Email;
               newedit.Verified = shelter.Verified;
              
                _context.Shelters.Update(newedit);
                _context.SaveChanges();

                return Ok(newedit);
                   
        }

        [HttpDelete("deleteShelter/{id}")]
        public IActionResult DeleteShelter(int id) {


            var shelter = _context.Shelters.Find(id);

            if (shelter != null)
            {
                var animals = _context.Animals.Where(a => a.ShelterId == id).ToList();

                if (animals.Any())
                {
                    _context.Animals.RemoveRange(animals);
                }

                _context.Shelters.Remove(shelter);
                _context.SaveChanges();

                return NoContent();
            }

            return NotFound($"there is no shelter with id {id}");



        }

           


        [HttpGet("GetAllCategory")]
        public async Task<IActionResult> GetAllCategory()
        {

            var categorys = _context.Categories.ToList();
            if (!categorys.Any()) { return NotFound("no ctaegory in our dataBase"); }
            return Ok(categorys);
        }
        [HttpPost("AddNewCategory")]
        public async Task<IActionResult> AddNewCategory([FromForm] AddCategoryDto add)
        {

            if (add.Image != null && add.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + add.Image.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await add.Image.CopyToAsync(fileStream);
                    }


                    var cat = new Category
                    {

                        Image = $"/images/{uniqueFileName}",
                        Species = add.Species

                    };


                    _context.Categories.Add(cat);
                    await _context.SaveChangesAsync();

                    return Ok(cat);
                }
                catch (Exception ex)
                {

                    return StatusCode(500, "An error occurred while processing your request.");
                }

            }
            return BadRequest("Invalid data or missing image.");
        }
        [HttpPut("UpdateCategory/{id}")]
        public async Task<IActionResult> UpdateCategory(int id ,[FromForm] AddCategoryDto upd) {
            if (id <= 0) { BadRequest("ID can't be less or equal 0"); }
            var Category = _context.Categories.FirstOrDefault(x => x.Id == id);
            if (Category == null) {
                return NotFound("no category under this id");
            }
            if (upd.Image != null && upd.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");



                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + upd.Image.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    await upd.Image.CopyToAsync(fileStream);
                }
                Category.Image = $"/images/{uniqueFileName}";
                Category.Species = upd.Species ?? Category.Species;
                await _context.SaveChangesAsync();
                return Ok(Category);
            }
            else
            {
                Category.Image = Category.Image;
                Category.Species = upd.Species ?? Category.Species;
                await _context.SaveChangesAsync();
                return Ok(Category);
            }
         

        }
        [HttpDelete("DeletCategoryById/{id}")]
        public async Task<IActionResult> DeletCategoryById(int id) {
            if (id <= 0) { return BadRequest("id can't be zero or less"); }
            var category=_context.Categories.FirstOrDefault(c => c.Id == id);
            if (category != null) {

                var animal =  _context.Animals.Where(x => x.CategoryId == id).ToList();
                if (animal.Any()) {
                    _context.Animals.RemoveRange(animal);
                }
            }
            _context.Categories.Remove(category);
            _context.SaveChanges();
            return Ok(category);
        }
        [HttpGet("GetAnimalDetailsById/{id}")]
        public async Task<IActionResult> GetAnimalDetailsById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID can't be zero or less");
            }
            var animal = await _context.Animals
                .Include(a => a.Shelter) 
                .FirstOrDefaultAsync(x => x.AnimalId == id);

            if (animal != null)
            {
                var animalInfo = new
                {
                    animalId=animal.AnimalId,
                    animalImage = animal.ImageUrl,
                    animalName = animal.Name,
                    animalSize = animal.Size,
                    animalSpecialNeeds = animal.SpecialNeeds,
                    animalAge = animal.Age,
                    animalBreed=animal.Breed,
                    animaladoptionStatus=animal.AdoptionStatus,
                    animalTemperament = animal.Temperament,
                    shelterName = animal.Shelter?.Name,
                    shelterEmail = animal.Shelter?.Email,
                    shelterAddress = animal.Shelter?.Address,
                    shelterVerified = animal.Shelter?.Verified ?? false 
                };

                return Ok(animalInfo);
            }
            else
            {
                return NotFound("No animal found under this ID");
            }
        }
        [HttpGet("getUserByID/{id}")]
        public async Task<IActionResult> getUserByID(int id) {
            if (id <= 0) { return BadRequest("id can't be zero or less"); }
            var user=await _context.Users.FindAsync(id);
            if (user == null) { return NotFound("no user found under this id"); }
            return Ok(user);
        
        }
        [HttpPost("ApplicationFormSubmit")]
        public async Task<IActionResult> ApplicationFormSubmit([FromBody] AdoptionDto adopt)
        {
           
            if (adopt.AnimalId <= 0 || adopt.UserId <= 0)
            {
                return BadRequest("ID can't be zero or less.");
            }

           

            var application = new AdoptionApplication
            {
                AnimalId = adopt.AnimalId,
                UserId = adopt.UserId,
                SubmittedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Status = "pending",
              AdoptionNotes=adopt.AdoptionNotes
            };

            _context.AdoptionApplications.Add(application);
            _context.SaveChanges();
            return CreatedAtAction(nameof(ApplicationFormSubmit), new { id = application.AnimalId }, application);
        }
        [HttpGet("GetAllAdoptionApplication")]
        public async Task<IActionResult> GetAllAdoptionApplication()
        {
            var applications = await _context.AdoptionApplications
                .Where(x => x.Status == "pending")
                .Select(x => new
                {
                    ApplicationId = x.ApplicationId,
                    ApplicantName = x.User.UserName,      
                    AnimalName = x.Animal.Name,      
                    AdoptionNotes = x.AdoptionNotes,  
                    Status = x.Status
                })
                .ToListAsync();

            if (applications == null || !applications.Any())
            {
                return NotFound();
            }

            return Ok(applications);
        }

        [HttpPut("{applicationId}/accept")]
        public async Task<IActionResult> AcceptApplication(int applicationId)
        {
           
            var application = await _context.AdoptionApplications.FindAsync(applicationId);
            if (application == null)
            {
               
                Console.WriteLine($"Application with ID {applicationId} not found.");
                return NotFound(new { message = $"Application with ID {applicationId} not found." });
            }

           
            if (application.Status != "pending")
            {
               
                Console.WriteLine($"Application with ID {applicationId} is not pending.");
                return BadRequest(new { message = "Application is not pending" });
            }

          
            application.Status = "accepted";
            application.UpdatedAt = DateTime.Now;

            
            var otherApplications = await _context.AdoptionApplications
                .Where(a => a.AnimalId == application.AnimalId && a.ApplicationId != applicationId && a.Status == "pending")
                .ToListAsync();

            foreach (var otherApp in otherApplications)
            {
                otherApp.Status = "rejected";
                otherApp.UpdatedAt = DateTime.Now;
            }

           
            await _context.SaveChangesAsync();

           
            Console.WriteLine($"Application with ID {applicationId} accepted. Other applications rejected.");
            return Ok();
        }


    }
}