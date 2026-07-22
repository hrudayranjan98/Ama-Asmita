using System.ComponentModel.DataAnnotations;

namespace AmaAsmita.Domain.Entities;

public class SavedContent
{
    [Key]
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string ContentId { get; set; } = string.Empty;

    public string ContentType { get; set; } = string.Empty;

    public string ContentName { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;

    public string Location { get; set; } = string.Empty;

    public DateTime SavedOn { get; set; }
        = DateTime.UtcNow;
}