using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservaSalasAPI.Data;
using ReservaSalasAPI.Models;

namespace ReservaSalasAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservasController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReservasController(AppDbContext context)
    {
        _context = context;
    }

    // ✅ GET: api/reservas → lista todas las reservas
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reserva>>> GetReservas()
    {
        return await _context.Reservas
            .Include(r => r.Sala)
            .ToListAsync();
    }

    // ✅ GET: api/reservas/5 → obtiene una reserva por ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Reserva>> GetReserva(int id)
    {
        var reserva = await _context.Reservas
            .Include(r => r.Sala)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (reserva == null) return NotFound();

        return reserva;
    }

    // ✅ POST: api/reservas → crea una nueva reserva
    [HttpPost]
    public async Task<ActionResult<Reserva>> CreateReserva(Reserva reserva)
    {
        // Validar que la sala exista
        var sala = await _context.Salas.FindAsync(reserva.SalaId);
        if (sala == null)
            return BadRequest("La sala no existe.");

        // Validar conflicto de horario
        bool conflicto = await _context.Reservas.AnyAsync(r =>
            r.SalaId == reserva.SalaId &&
            ((reserva.FechaInicio >= r.FechaInicio && reserva.FechaInicio < r.FechaFin) ||
             (reserva.FechaFin > r.FechaInicio && reserva.FechaFin <= r.FechaFin))
        );

        if (conflicto)
            return BadRequest("La sala ya está reservada en ese horario.");

        _context.Reservas.Add(reserva);
        await _context.SaveChangesAsync();

        // Cargar sala para incluir en respuesta
        await _context.Entry(reserva).Reference(r => r.Sala).LoadAsync();

        return CreatedAtAction(nameof(GetReserva), new { id = reserva.Id }, reserva);
    }

    // ✅ PUT: api/reservas/{id} → actualiza una reserva existente
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateReserva(int id, Reserva reserva)
    {
        if (id != reserva.Id)
            return BadRequest("El ID de la URL no coincide con la reserva enviada.");

        var existingReserva = await _context.Reservas.FindAsync(id);
        if (existingReserva == null)
            return NotFound();

        // Validar que la sala exista
        var sala = await _context.Salas.FindAsync(reserva.SalaId);
        if (sala == null)
            return BadRequest("La sala no existe.");

        // Validar conflicto de horario, ignorando la misma reserva
        bool conflicto = await _context.Reservas.AnyAsync(r =>
            r.Id != id &&
            r.SalaId == reserva.SalaId &&
            ((reserva.FechaInicio >= r.FechaInicio && reserva.FechaInicio < r.FechaFin) ||
             (reserva.FechaFin > r.FechaInicio && reserva.FechaFin <= r.FechaFin))
        );

        if (conflicto)
            return BadRequest("La sala ya está reservada en ese horario.");

        // Actualizar datos
        existingReserva.Usuario = reserva.Usuario;
        existingReserva.SalaId = reserva.SalaId;
        existingReserva.FechaInicio = reserva.FechaInicio;
        existingReserva.FechaFin = reserva.FechaFin;

        await _context.SaveChangesAsync();

        return NoContent(); // 204 OK sin contenido
    }

    // ✅ DELETE: api/reservas/{id} → elimina una reserva
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReserva(int id)
    {
        var reserva = await _context.Reservas.FindAsync(id);
        if (reserva == null) return NotFound();

        _context.Reservas.Remove(reserva);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
