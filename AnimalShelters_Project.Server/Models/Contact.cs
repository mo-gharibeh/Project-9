using System;
using System.Collections.Generic;

namespace AnimalShelters_Project.Server.Models;

public partial class Contact
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Message { get; set; } = null!;

    public string? Reply { get; set; }
}
