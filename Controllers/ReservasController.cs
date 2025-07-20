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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reserva>>> GetReservas()
    {
        return await _context.Reservas.Include(r => r.Sala).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Reserva>> GetReserva(int id)
    {
        var reserva = await _context.Reservas.Include(r => r.Sala)
                                             .FirstOrDefaultAsync(r => r.Id == id);
        if (reserva == null) return NotFound();
        return reserva;
    }

    [HttpPost]
    public async Task<ActionResult<Reserva>> CreateReserva(Reserva reserva)
    {
        // Verificar que la sala exista
        var sala = await _context.Salas.FindAsync(reserva.SalaId);
        if (sala == null) return BadRequest("La sala no existe.");

        // Verificar conflicto de horario
        bool conflicto = await _context.Reservas.AnyAsync(r =>
            r.SalaId == reserva.SalaId &&
            ((reserva.FechaInicio >= r.FechaInicio && reserva.FechaInicio < r.FechaFin) ||
             (reserva.FechaFin > r.FechaInicio && reserva.FechaFin <= r.FechaFin))
        );

        if (conflicto)
        {
            return BadRequest("La sala ya está reservada en ese horario.");
        }

        _context.Reservas.Add(reserva);
        await _context.SaveChangesAsync();

        // Cargar sala para que se incluya en la respuesta
        await _context.Entry(reserva).Reference(r => r.Sala).LoadAsync();

        return CreatedAtAction(nameof(GetReserva), new { id = reserva.Id }, reserva);
    }

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
