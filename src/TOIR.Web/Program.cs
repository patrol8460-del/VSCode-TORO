
using Microsoft.EntityFrameworkCore;
using TOIR.Core.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        opts.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        opts.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });
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

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapControllers();

// Seed test data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Equipments.AddRange(
        new TOIR.Core.Equipment { Tip_model = "HySTAT-A1000Q/60/10", Status_oborudovaniya = "Демонтаж", Ceh = "31", MVZ = "U130020101" },
        new TOIR.Core.Equipment { Tip_model = "0,35 ТС-1300мм", Status_oborudovaniya = "Консервация", Ceh = "39", MVZ = "U130021301" },
        new TOIR.Core.Equipment { Tip_model = "0,5-1К-4,5-5,1-6", Status_oborudovaniya = "Монтаж", Ceh = "42", MVZ = "U130021302" },
        new TOIR.Core.Equipment { Tip_model = "0,68 ТС-1500", Status_oborudovaniya = "Не эксплуатируется", Ceh = "48", MVZ = "U130021311" },
        new TOIR.Core.Equipment { Tip_model = "00 686 006 42ТХ", Status_oborudovaniya = "Списано", Ceh = "50", MVZ = "U130021321" },
        new TOIR.Core.Equipment { Tip_model = "05WM16", Status_oborudovaniya = "Эксплуатируется", Ceh = "52", MVZ = "U130021331" },
        new TOIR.Core.Equipment { Tip_model = "07-189А.00187-ТХ", Ceh = "55", MVZ = "U130021341" },
        new TOIR.Core.Equipment { Tip_model = "07-274.00155-ТХ", Ceh = "56", MVZ = "U130023902" },
        new TOIR.Core.Equipment { Tip_model = "07-274Д.00020 (+6.0)", Ceh = "57", MVZ = "U130023921" },
        new TOIR.Core.Equipment { Tip_model = "07-274Д.00020-ТХ1", Ceh = "58", MVZ = "U130024211" }
    );
    db.SaveChanges();
}

app.Run();
