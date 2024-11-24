using System;
using System.Collections.Generic;

namespace AnimalShelters_Project.Server.Models;

public partial class Category
{
    public long Id { get; set; }

    public string Species { get; set; } = null!;

    public string? Image { get; set; }

    public virtual ICollection<Animal> Animals { get; set; } = new List<Animal>();
}
