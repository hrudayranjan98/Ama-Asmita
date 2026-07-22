using Microsoft.AspNetCore.Http;

public class ContributionRequest
{
    public string FullName { get; set; } = "";
    public string Category { get; set; } = "";
    public string Title { get; set; } = "";
    public string Article { get; set; } = "";
    public string GoogleMapLink { get; set; } = "";
    public string ContributorAddress { get; set; } = "";
    public string FacebookLink { get; set; } = "";
    public string InstagramLink { get; set; } = "";
    public string LinkedInLink { get; set; } = "";

    public IFormFile? ContributorPhoto { get; set; }

    public IFormFile? Photo1 { get; set; }

    public IFormFile? Photo2 { get; set; }

    public IFormFile? Photo3 { get; set; }
}