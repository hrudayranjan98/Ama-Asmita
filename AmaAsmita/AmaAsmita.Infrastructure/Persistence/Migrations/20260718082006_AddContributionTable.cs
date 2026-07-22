using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AmaAsmita.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddContributionTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contributions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Article = table.Column<string>(type: "text", nullable: false),
                    GoogleMapLink = table.Column<string>(type: "text", nullable: false),
                    ContributorAddress = table.Column<string>(type: "text", nullable: false),
                    FacebookLink = table.Column<string>(type: "text", nullable: false),
                    InstagramLink = table.Column<string>(type: "text", nullable: false),
                    LinkedInLink = table.Column<string>(type: "text", nullable: false),
                    ContributorPhoto = table.Column<string>(type: "text", nullable: false),
                    Photo1 = table.Column<string>(type: "text", nullable: false),
                    Photo2 = table.Column<string>(type: "text", nullable: false),
                    Photo3 = table.Column<string>(type: "text", nullable: false),
                    SubmittedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contributions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contributions");
        }
    }
}
