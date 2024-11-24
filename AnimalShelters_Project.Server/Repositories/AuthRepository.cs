using AnimalShelters_Project.Server.Helpers;
using AnimalShelters_Project.Server.Models;
using AnimalShelters_Project.Server.shared;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Text;

namespace AnimalShelters_Project.Server.Repositories
{
    public class AuthRepository(MyDbContext context)
    {
        public User? GetUser(UserLoginDto loginData)
        {

            var user = context.Users.SingleOrDefault(u => u.Email == loginData.Email);
            if (user == null)
                return null;

            var hashedPassword = HashHelper.HashPassword(loginData.Password, Encoding.UTF8.GetString(user.PasswordSalt));
            return Encoding.UTF8.GetString(user.PasswordHash) == hashedPassword ? user : null;
        }

        public User? GetUserByEmail(string email)
        {
            email = email.Trim().ToLower();
            return context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User RegisterUser(UserRegisterDto userData)
        {

            var salt = SaltHelper.GenerateSalt(16);

            var hashedPassword = HashHelper.HashPassword(userData.Password, salt);
            var user = new User
            {
                Email = userData.Email,
                PasswordHash = HashHelper.ConvertStringToByteArray(hashedPassword),
                PasswordSalt = HashHelper.ConvertStringToByteArray(salt),
                Password = userData.Password,
                UserName = userData.Username
            };
            if (userData.Image != null)
            {
                user.Image = ImageSaver.SaveImage(userData.Image);
            }
            context.Users.Add(user);
            context.SaveChanges();
            return user;
        }

        public List<User> All()
        {
            return context.Users.ToList();
        }
    }
}
