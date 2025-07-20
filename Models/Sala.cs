namespace ReservaSalasAPI.Models;

public class Sala
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public int Capacidad { get; set; }

    // Relación 1:N
    public ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
