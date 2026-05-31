
using Microsoft.EntityFrameworkCore;
using TOIR.Core.Models;

namespace TOIR.Core.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Needs> Needs => Set<Needs>();
}
