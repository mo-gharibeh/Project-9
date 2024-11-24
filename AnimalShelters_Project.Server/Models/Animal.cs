using System;
using System.Collections.Generic;

namespace AnimalShelters_Project.Server.Models;

public partial class Animal
{
    public int AnimalId { get; set; }

    public string Name { get; set; } = null!;

    public long? CategoryId { get; set; }

    public string? Breed { get; set; }

    public int Age { get; set; }

    public int? ShelterId { get; set; }

    public string? Size { get; set; }

    public string? Temperament { get; set; }

    public string? SpecialNeeds { get; set; }

    public string? AdoptionStatus { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<AdoptionApplication> AdoptionApplications { get; set; } = new List<AdoptionApplication>();

    public virtual Category? Category { get; set; }

    public virtual Shelter? Shelter { get; set; }
}
