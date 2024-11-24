﻿using System;
using System.Collections.Generic;

namespace AnimalShelters_Project.Server.Models;

public partial class Comment
{
    public long Id { get; set; }

    public long? PostId { get; set; }

    public int? UserId { get; set; }

    public string? Content { get; set; }

    public virtual Post? Post { get; set; }

    public virtual ICollection<Reply> Replies { get; set; } = new List<Reply>();

    public virtual User? User { get; set; }
}
