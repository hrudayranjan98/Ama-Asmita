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
}