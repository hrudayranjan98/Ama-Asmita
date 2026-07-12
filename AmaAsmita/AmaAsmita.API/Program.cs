using AmaAsmita.Application.Interfaces;
using AmaAsmita.Infrastructure.Persistence;
using AmaAsmita.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

/* ==========================================
   SERVICES
========================================== */

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

/* ==========================================
   DATABASE
========================================== */

builder.Services.AddDbContext<AppDbContext>(
    options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString(
            "DefaultConnection"
        )
    )
);

/* ==========================================
   JWT SERVICE
========================================== */

builder.Services.AddScoped<
    IJwtService,
    JwtService
>();

/* ==========================================
   JWT AUTHENTICATION
========================================== */

builder.Services
.AddAuthentication(
    JwtBearerDefaults.AuthenticationScheme
)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters =
        new TokenValidationParameters
        {
            ValidateIssuer = true,

            ValidateAudience = true,

            ValidateLifetime = true,

            ValidateIssuerSigningKey = true,

            ValidIssuer =
                builder.Configuration["Jwt:Issuer"],

            ValidAudience =
                builder.Configuration["Jwt:Audience"],

            IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        builder.Configuration["Jwt:Key"]!
                    )
                )
        };
});

/* ==========================================
   CORS
========================================== */

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

/* ==========================================
   BUILD APP
========================================== */

var app = builder.Build();

/* ==========================================
   SWAGGER
========================================== */

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}

/* ==========================================
   MIDDLEWARE
========================================== */

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowFrontend");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

/* ==========================================
   RUN APP
========================================== */

app.Run();