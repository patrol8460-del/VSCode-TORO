
using Microsoft.EntityFrameworkCore;
using TOIR.Core.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("TOIRDb"));
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();

// Seed test data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Needs.AddRange(
        new TOIR.Core.Models.Needs { Id = 1, Status = "Согласовано", PurchaseGroup = "Электротехника", OZM = "ОЗМ-001" },
        new TOIR.Core.Models.Needs { Id = 2, Status = "На рассмотрении", PurchaseGroup = "Трубопровод", OZM = "ОЗМ-002" },
        new TOIR.Core.Models.Needs { Id = 3, Status = "Согласовано", PurchaseGroup = "Металлоконструкции", OZM = "ОЗМ-003" },
        new TOIR.Core.Models.Needs { Id = 4, Status = "Отклонено", PurchaseGroup = "Электротехника", OZM = "ОЗМ-004" },
        new TOIR.Core.Models.Needs { Id = 5, Status = "Согласовано", PurchaseGroup = "Кабельная продукция", OZM = "ОЗМ-005" }
    );
    db.SaveChanges();
}

app.Run();
