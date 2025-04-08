﻿// <auto-generated />
using System;
using CineNicheIntex.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CineNicheIntex.API.Migrations
{
    [DbContext(typeof(MoviesDbContext))]
    partial class MoviesDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.3");

            modelBuilder.Entity("CineNicheIntex.API.Data.Movie", b =>
                {
                    b.Property<string>("show_id")
                        .HasColumnType("TEXT");

                    b.Property<int?>("Action")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Adventure")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Anime_Series_International_TV_Shows")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Anime Series International TV Shows");

                    b.Property<int?>("British_TV_Shows_Docuseries_International_TV_Shows")
                        .HasColumnType("INTEGER")
                        .HasColumnName("British TV Shows Docuseries International TV Shows");

                    b.Property<int?>("Children")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Comedies")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Comedies_Dramas_International_Movies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Comedies Dramas International Movies");

                    b.Property<int?>("Comedies_International_Movies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Comedies International Movies");

                    b.Property<int?>("Comedies_Romantic_Movies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Comedies Romantic Movies");

                    b.Property<int?>("Crime_TV_Shows_Docuseries")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Crime TV Shows Docuseries");

                    b.Property<int?>("Documentaries")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Documentaries_International_Movies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Documentaries International Movies");

                    b.Property<int?>("Docuseries")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Dramas")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Dramas_International_Movies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Dramas International Movies");

                    b.Property<int?>("Dramas_Romantic_Movies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Dramas Romantic Movies");

                    b.Property<int?>("Family_Movies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Family Movies");

                    b.Property<int?>("Fantasy")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Horror_Movies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Horror Movies");

                    b.Property<int?>("International_Movies_Thrillers")
                        .HasColumnType("INTEGER")
                        .HasColumnName("International Movies Thrillers");

                    b.Property<int?>("International_TV_Shows_Romantic_TV_Shows_TV_Dramas")
                        .HasColumnType("INTEGER")
                        .HasColumnName("International TV Shows Romantic TV Shows TV Dramas");

                    b.Property<int?>("Kids_TV")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Kids' TV");

                    b.Property<int?>("Language_TV_Shows")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Language TV Shows");

                    b.Property<int?>("Musicals")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Nature_TV")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Nature TV");

                    b.Property<int?>("Reality_TV")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Reality TV");

                    b.Property<int?>("Spirituality")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("TV_Action")
                        .HasColumnType("INTEGER")
                        .HasColumnName("TV Action");

                    b.Property<int?>("TV_Comedies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("TV Comedies");

                    b.Property<int?>("TV_Dramas")
                        .HasColumnType("INTEGER")
                        .HasColumnName("TV Dramas");

                    b.Property<int?>("Talk_Shows_TV_Comedies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Talk Shows TV Comedies");

                    b.Property<int?>("Thrillers")
                        .HasColumnType("INTEGER");

                    b.Property<string>("cast")
                        .HasColumnType("TEXT")
                        .HasColumnName("cast");

                    b.Property<string>("country")
                        .HasColumnType("TEXT");

                    b.Property<string>("description")
                        .HasColumnType("TEXT");

                    b.Property<string>("director")
                        .HasColumnType("TEXT");

                    b.Property<string>("duration")
                        .HasColumnType("TEXT");

                    b.Property<string>("rating")
                        .HasColumnType("TEXT");

                    b.Property<int?>("release_year")
                        .HasColumnType("INTEGER");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("type")
                        .HasColumnType("TEXT")
                        .HasColumnName("type");

                    b.HasKey("show_id");

                    b.ToTable("movies_titles", (string)null);
                });

            modelBuilder.Entity("CineNicheIntex.API.Data.Rating", b =>
                {
                    b.Property<int>("user_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("rating")
                        .HasColumnType("INTEGER");

                    b.Property<string>("show_id")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("user_id");

                    b.ToTable("movies_ratings", (string)null);
                });

            modelBuilder.Entity("CineNicheIntex.API.Data.User", b =>
                {
                    b.Property<int>("user_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Amazon_Prime")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Amazon Prime");

                    b.Property<int>("AppleTVPlus")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Apple TV+");

                    b.Property<int>("DisneyPlus")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Disney+");

                    b.Property<int>("Hulu")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Max")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Netflix")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ParamountPlus")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Paramount+");

                    b.Property<int>("Peacock")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TwoFactorCode")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("TwoFactorExpiry")
                        .HasColumnType("TEXT");

                    b.Property<int>("age")
                        .HasColumnType("INTEGER");

                    b.Property<string>("city")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("gender")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("hashed_password")
                        .HasColumnType("TEXT");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("phone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("state")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("zip")
                        .HasColumnType("INTEGER");

                    b.HasKey("user_id");

                    b.ToTable("movies_users", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
