using Microsoft.EntityFrameworkCore;
using ReservaSalasAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// ✅ CORS global sin restricciones
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Servicios normales
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// PostgreSQL connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")));

var app = builder.Build();

app.UseDeveloperExceptionPage();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// ✅ Activar CORS ANTES de autorización
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
