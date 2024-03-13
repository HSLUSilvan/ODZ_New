using Microsoft.EntityFrameworkCore;
using ODZ_BackEnd.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
.AddJsonOptions(options =>
 {
     options.JsonSerializerOptions.Converters.Add(new DateOnlyConverter());
 });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var connectionString = builder.Configuration.GetConnectionString("Default");

builder.Services.AddDbContext<OrganDbContext>(x => x.UseMySql(connectionString, Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.29-mysql")));

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.IncludeFields = true;
});

//builder.Services.AddControllers().AddNewtonsoftJson(options =>
    //options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
//);

builder.Services.AddCors((setup) =>
{
setup.AddPolicy("default", (options) =>
{
    options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();

});
});

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("default");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
