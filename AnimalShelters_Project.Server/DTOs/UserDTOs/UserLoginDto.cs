using System.ComponentModel.DataAnnotations;

    public class UserLoginDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        public string Password { get; set; }
    }
