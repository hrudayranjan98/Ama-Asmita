using AmaAsmita.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AmaAsmita.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options
    ) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<SavedContent> SavedContents => Set<SavedContent>();

    public DbSet<Contribution> Contributions => Set<Contribution>();

    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();


    protected override void OnModelCreating(
        ModelBuilder modelBuilder
    )
    {
        base.OnModelCreating(
            modelBuilder
        );

        modelBuilder.Entity<UserProfile>()
            .HasOne(x => x.User)
            .WithOne()
            .HasForeignKey<UserProfile>(
                x => x.UserId
            )
            .OnDelete(
                DeleteBehavior.Cascade
            );
    }
}