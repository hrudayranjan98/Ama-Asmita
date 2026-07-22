namespace AmaAsmita.Application.DTOs;

public class SavedContentRequest
{
    public string ContentId { get; set; }
        = string.Empty;

    public string ContentType { get; set; }
        = string.Empty;

    public string ContentName { get; set; }
        = string.Empty;

    public string ImageUrl { get; set; }
        = string.Empty;

    public string Location { get; set; }
        = string.Empty;
}