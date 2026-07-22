namespace AmaAsmita.Application.DTOs;

public class UserProfileRequest
{
    public string Name { get; set; } = string.Empty;

    public string UserName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public string? FacebookLink { get; set; }

    public string? InstagramLink { get; set; }

    public string? LinkedInLink { get; set; }
}