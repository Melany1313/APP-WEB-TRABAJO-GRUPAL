using Microsoft.EntityFrameworkCore;
using ReservaSalasAPI.Models;

namespace ReservaSalasAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Sala> Salas { get; set; }
    public DbSet<Reserva> Reservas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuración básica
        modelBuilder.Entity<Sala>().ToTable("Salas");
        modelBuilder.Entity<Reserva>().ToTable("Reservas");

        // Relación 1:N
        modelBuilder.Entity<Reserva>()
            .HasOne(r => r.Sala)
            .WithMany(s => s.Reservas)
            .HasForeignKey(r => r.SalaId);
    }
}
