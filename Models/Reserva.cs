using System.Text.Json.Serialization; // Para JsonIgnore

namespace ReservaSalasAPI.Models;

public class Reserva
{
    public int Id { get; set; }
    public string Usuario { get; set; } = string.Empty;

    public int SalaId { get; set; }

    [JsonIgnore]  // Ignorar la propiedad Sala en la serialización/deserialización JSON
    public Sala? Sala { get; set; }  

    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
}
