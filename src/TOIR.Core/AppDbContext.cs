
using Microsoft.EntityFrameworkCore;
using TOIR.Core;

namespace TOIR.Core.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Equipment> Equipments { get; set; }
}
