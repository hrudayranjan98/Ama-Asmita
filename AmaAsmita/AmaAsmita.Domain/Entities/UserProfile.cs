using System.ComponentModel.DataAnnotations;

namespace AmaAsmita.Domain.Entities;

public class UserProfile
{
    [Key]
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string? Bio { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public string? FacebookLink { get; set; }

    public string? InstagramLink { get; set; }

    public string? LinkedInLink { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public User User { get; set; } = null!;
}