
using Microsoft.EntityFrameworkCore;
using TOIR.Core;

namespace TOIR.Core.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Equipment> Equipments { get; set; }
    public DbSet<MeasurableParameter> MeasurableParameters { get; set; }
    public DbSet<ParameterMeasurement> ParameterMeasurements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MeasurableParameter>()
            .HasOne(p => p.Equipment)
            .WithMany()
            .HasForeignKey(p => p.EquipmentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ParameterMeasurement>()
            .HasOne(m => m.Parameter)
            .WithMany(p => p.Measurements)
            .HasForeignKey(m => m.ParameterId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
