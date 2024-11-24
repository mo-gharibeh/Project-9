using System;
using System.Collections.Generic;

namespace AnimalShelters_Project.Server.Models;

public partial class Post
{
    public long Id { get; set; }

    public int? UserId { get; set; }

    public string? Content { get; set; }

    public string? Image { get; set; }

    public string? Title { get; set; }

    public bool? Flag { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual User? User { get; set; }
}
