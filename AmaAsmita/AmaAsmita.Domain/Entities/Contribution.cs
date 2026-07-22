namespace AmaAsmita.Domain.Entities;

public class Contribution
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string Article { get; set; } = string.Empty;

    public string GoogleMapLink { get; set; } = string.Empty;

    public string ContributorAddress { get; set; } = string.Empty;

    public string FacebookLink { get; set; } = string.Empty;

    public string InstagramLink { get; set; } = string.Empty;

    public string LinkedInLink { get; set; } = string.Empty;

    public string ContributorPhoto { get; set; } = string.Empty;

    public string Photo1 { get; set; } = string.Empty;

    public string Photo2 { get; set; } = string.Empty;

    public string Photo3 { get; set; } = string.Empty;

    public DateTime SubmittedOn { get; set; }
        = DateTime.UtcNow;

    public string Status { get; set; }
        = "Pending";
}