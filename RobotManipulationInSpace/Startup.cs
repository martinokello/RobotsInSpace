using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RobotManipulation.Models;
using RobotManipulationInSpace.ViewModels;

namespace RobotManipulationInSpace
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var mapperConfiguration = new MapperConfiguration((conf) =>
            {

                conf.CreateMap<RobotViewModel, Robot>();
                conf.CreateMap<RobotViewModel, Robot>().ReverseMap();
                conf.CreateMap<CoordinateViewModel, Location>();
                conf.CreateMap<CoordinateViewModel, Location>().ReverseMap();
                conf.CreateMap<PlaneViewModel, Plane>();
                conf.CreateMap<PlaneViewModel, Plane>().ReverseMap();

            });

            services.AddScoped<RobotViewModel>();
            services.AddScoped<CoordinateViewModel>();
            services.AddScoped<PlaneViewModel>();
            services.AddScoped(map => new Mapper(mapperConfiguration));


            services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNameCaseInsensitive = true).
                AddNewtonsoftJson(options => options.UseCamelCasing(true))
                .AddXmlDataContractSerializerFormatters();
            services.AddDistributedMemoryCache();

            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UsePathBase("/robots");

            app.Use((context, next) =>
            {
                context.Request.PathBase = "/robots";
                return next();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
