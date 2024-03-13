using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ODZ_BackEnd.Models
{
    public partial class OrganDbContext : DbContext
    {
        public OrganDbContext()
        {
        }

        public OrganDbContext(DbContextOptions<OrganDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Aenderung> Aenderung { get; set; } = null!;
        public virtual DbSet<Aktion> Aktion { get; set; } = null!;
        public virtual DbSet<Benutzer> Benutzer { get; set; } = null!;
        public virtual DbSet<Datum> Data { get; set; } = null!;
        public virtual DbSet<Efmigrationshistory> Efmigrationshistories { get; set; } = null!;
        public virtual DbSet<Gehaeuse> Gehaeuse { get; set; } = null!;
        public virtual DbSet<Kalender> Kalender { get; set; } = null!;
        public virtual DbSet<Kanton> Kanton { get; set; } = null!;
        public virtual DbSet<Kontakt> Kontakt { get; set; } = null!;
        public virtual DbSet<Kontakttyp> Kontakttyp { get; set; } = null!;
        public virtual DbSet<Labiale> Labiale { get; set; } = null!;
        public virtual DbSet<Laden> Laden { get; set; } = null!;
        public virtual DbSet<Land> Land { get; set; } = null!;
        public virtual DbSet<Lastinserted> Lastinserted { get; set; } = null!;
        public virtual DbSet<Literatur> Literatur { get; set; } = null!;
        public virtual DbSet<LiteraturKontakt> LiteraturKontakt { get; set; } = null!;
        public virtual DbSet<LiteraturMassnahme> LiteraturMassnahme { get; set; } = null!;
        public virtual DbSet<Massnahme> Massnahme { get; set; } = null!;
        public virtual DbSet<Medium> Media { get; set; } = null!;
        public virtual DbSet<Mediumtyp> Mediumtyp { get; set; } = null!;
        public virtual DbSet<Mixturkornette> Mixturkornette { get; set; } = null!;
        public virtual DbSet<Orgel> Orgel { get; set; } = null!;
        public virtual DbSet<Ort> Ort { get; set; } = null!;
        public virtual DbSet<Register> Register { get; set; } = null!;
        public virtual DbSet<Rolle> Rolle { get; set; } = null!;
        public virtual DbSet<Sessionlog> Sessionlog { get; set; } = null!;
        public virtual DbSet<T> Ts { get; set; } = null!;
        public virtual DbSet<Tastenreihe> Tastenreihe { get; set; } = null!;
        public virtual DbSet<Tregpo> Tregpos { get; set; } = null!;
        public virtual DbSet<Tt> Tt { get; set; } = null!;
        public virtual DbSet<Useddatum> Useddata { get; set; } = null!;
        public virtual DbSet<Uservw> Uservw { get; set; } = null!;
        public virtual DbSet<Werk> Werk { get; set; } = null!;
        public virtual DbSet<Zungen> Zungen { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;database=odz;uid=root;pwd=ODZ_2022", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.29-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Aenderung>(entity =>
            {
                entity.ToTable("aenderung");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Aktion, "aktion");

                entity.HasIndex(e => e.Benutzer, "benutzer");

                entity.HasIndex(e => e.Kontakt, "kontakt");

                entity.HasIndex(e => e.Literatur, "literatur");

                entity.HasIndex(e => e.Massnahme, "massnahme");

                entity.HasIndex(e => e.Orgel, "orgel");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Aktion).HasColumnName("aktion");

                entity.Property(e => e.Benutzer).HasColumnName("benutzer");

                entity.Property(e => e.Datum).HasColumnName("datum");

                entity.Property(e => e.Kontakt).HasColumnName("kontakt");

                entity.Property(e => e.Literatur).HasColumnName("literatur");

                entity.Property(e => e.Massnahme).HasColumnName("massnahme");

                entity.Property(e => e.Medium).HasColumnName("medium");

                entity.Property(e => e.Orgel).HasColumnName("orgel");

                entity.HasOne(d => d.AktionNavigation)
                    .WithMany(p => p.Aenderungs)
                    .HasForeignKey(d => d.Aktion)
                    .HasConstraintName("aenderung_ibfk_1");

                entity.HasOne(d => d.BenutzerNavigation)
                    .WithMany(p => p.Aenderungs)
                    .HasForeignKey(d => d.Benutzer)
                    .HasConstraintName("aenderung_ibfk_2");
            });

            modelBuilder.Entity<Aktion>(entity =>
            {
                entity.ToTable("aktion");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(32)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Benutzer>(entity =>
            {
                entity.ToTable("benutzer");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Rolle, "rolle");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Bemerkung)
                    .HasMaxLength(255)
                    .HasColumnName("bemerkung");

                entity.Property(e => e.Istgeloescht).HasColumnName("istgeloescht");

                entity.Property(e => e.Name)
                    .HasMaxLength(64)
                    .HasColumnName("name");

                entity.Property(e => e.Passwort)
                    .HasMaxLength(40)
                    .HasColumnName("passwort");

                entity.Property(e => e.Rolle).HasColumnName("rolle");

                entity.HasOne(d => d.RolleNavigation)
                    .WithMany(p => p.Benutzers)
                    .HasForeignKey(d => d.Rolle)
                    .HasConstraintName("benutzer_ibfk_1");
            });

            modelBuilder.Entity<Datum>(entity =>
            {
                entity.ToTable("datum");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Bezeichnung)
                    .HasMaxLength(128)
                    .HasColumnName("bezeichnung");

                entity.Property(e => e.Bis).HasColumnName("bis");

                entity.Property(e => e.Datum1).HasColumnName("datum");

                entity.Property(e => e.Pape)
                    .HasMaxLength(20)
                    .HasColumnName("pape");
            });

            modelBuilder.Entity<Efmigrationshistory>(entity =>
            {
                entity.HasKey(e => e.MigrationId)
                    .HasName("PRIMARY");

                entity.ToTable("__efmigrationshistory");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ProductVersion).HasMaxLength(32);
            });

            modelBuilder.Entity<Gehaeuse>(entity =>
            {
                entity.ToTable("gehaeuse");

                entity.HasCharSet("latin1")
                    .UseCollation("latin1_swedish_ci");

                entity.HasIndex(e => e.Datumgehaeuse, "datumgehaeuse");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Datumgehaeuse).HasColumnName("datumgehaeuse");

                entity.Property(e => e.Fassunggehaeuse)
                    .HasMaxLength(300)
                    .HasColumnName("fassunggehaeuse");

                entity.Property(e => e.Gehäuseerhalten)
                    .HasMaxLength(300)
                    .HasColumnName("gehäuseerhalten");

                entity.Property(e => e.Gehäuseinschriften)
                    .HasMaxLength(300)
                    .HasColumnName("gehäuseinschriften");

                entity.Property(e => e.Kommentargehaeuse)
                    .HasColumnType("text")
                    .HasColumnName("kommentargehaeuse");

                entity.Property(e => e.Materialgehaeuse)
                    .HasMaxLength(300)
                    .HasColumnName("materialgehaeuse");

                entity.Property(e => e.Prospektanzahlpfeifen)
                    .HasMaxLength(300)
                    .HasColumnName("prospektanzahlpfeifen");

                entity.Property(e => e.Prospektklingend)
                    .HasMaxLength(128)
                    .HasColumnName("prospektklingend");

                entity.Property(e => e.Prospektregister)
                    .HasMaxLength(300)
                    .HasColumnName("prospektregister");

                entity.Property(e => e.Stilgehaeuse)
                    .HasMaxLength(300)
                    .HasColumnName("stilgehaeuse");

                entity.Property(e => e.Verziehrungengehaeuse)
                    .HasMaxLength(300)
                    .HasColumnName("verziehrungengehaeuse");

                entity.HasOne(d => d.DatumgehaeuseNavigation)
                    .WithMany(p => p.Gehaeuses)
                    .HasForeignKey(d => d.Datumgehaeuse)
                    .HasConstraintName("gehaeuse_ibfk_2");

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Gehaeuse)
                    .HasForeignKey<Gehaeuse>(d => d.Id)
                    .HasConstraintName("gehaeuse_ibfk_1");
            });

            modelBuilder.Entity<Kalender>(entity =>
            {
                entity.HasKey(e => e.Datum)
                    .HasName("PRIMARY");

                entity.ToTable("kalender");

                entity.HasCharSet("latin1")
                    .UseCollation("latin1_swedish_ci");

                entity.Property(e => e.Datum).HasColumnName("datum");

                entity.Property(e => e.Istfrei).HasColumnName("istfrei");
            });

            modelBuilder.Entity<Kanton>(entity =>
            {
                entity.ToTable("kanton");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(64)
                    .HasColumnName("name");

                entity.Property(e => e.Namekurz)
                    .HasMaxLength(16)
                    .HasColumnName("namekurz");
            });

            modelBuilder.Entity<Kontakt>(entity =>
            {
                entity.ToTable("kontakt");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Aufloesungsdatum, "aufloesungsdatum");

                entity.HasIndex(e => e.Beerdigungsdatum, "beerdigungsdatum");

                entity.HasIndex(e => e.Geburtsdatum, "geburtsdatum");

                entity.HasIndex(e => e.Geburtsort, "geburtsort");

                entity.HasIndex(e => e.Gruendungsdatum, "gruendungsdatum");

                entity.HasIndex(e => e.PBez, "kontakt_p_bez_i");

                entity.HasIndex(e => e.Ort, "ort");

                entity.HasIndex(e => e.Sterbedatum, "sterbedatum");

                entity.HasIndex(e => e.Sterbeort, "sterbeort");

                entity.HasIndex(e => e.Taufdatum, "taufdatum");

                entity.HasIndex(e => e.Typ, "typ");

                entity.HasIndex(e => e.Benutzer, "urheber");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Adresse)
                    .HasMaxLength(128)
                    .HasColumnName("adresse");

                entity.Property(e => e.Aufloesungsdatum).HasColumnName("aufloesungsdatum");

                entity.Property(e => e.Beerdigungsdatum).HasColumnName("beerdigungsdatum");

                entity.Property(e => e.Benutzer).HasColumnName("benutzer");

                entity.Property(e => e.Firmentyp)
                    .HasMaxLength(128)
                    .HasColumnName("firmentyp");

                entity.Property(e => e.Geburtsdatum).HasColumnName("geburtsdatum");

                entity.Property(e => e.Geburtsort).HasColumnName("geburtsort");

                entity.Property(e => e.Generation)
                    .HasMaxLength(128)
                    .HasColumnName("generation");

                entity.Property(e => e.Gruendungsdatum).HasColumnName("gruendungsdatum");

                entity.Property(e => e.Istorgelbauer).HasColumnName("istorgelbauer");

                entity.Property(e => e.Istorgelexperte).HasColumnName("istorgelexperte");

                entity.Property(e => e.Istsichbar).HasColumnName("istsichbar");

                entity.Property(e => e.Isturheber).HasColumnName("isturheber");

                entity.Property(e => e.Kommentar)
                    .HasColumnType("text")
                    .HasColumnName("kommentar");

                entity.Property(e => e.Nachfolger)
                    .HasMaxLength(128)
                    .HasColumnName("nachfolger");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Name1)
                    .HasMaxLength(128)
                    .HasColumnName("name1");

                entity.Property(e => e.Name2)
                    .HasMaxLength(128)
                    .HasColumnName("name2");

                entity.Property(e => e.Namemutter)
                    .HasMaxLength(128)
                    .HasColumnName("namemutter");

                entity.Property(e => e.Namevater)
                    .HasMaxLength(128)
                    .HasColumnName("namevater");

                entity.Property(e => e.Ort).HasColumnName("ort");

                entity.Property(e => e.PBez)
                    .HasMaxLength(14)
                    .HasColumnName("p_bez");

                entity.Property(e => e.Quelle)
                    .HasMaxLength(1024)
                    .HasColumnName("quelle");

                entity.Property(e => e.Sterbedatum).HasColumnName("sterbedatum");

                entity.Property(e => e.Sterbeort).HasColumnName("sterbeort");

                entity.Property(e => e.Synonyme)
                    .HasMaxLength(128)
                    .HasColumnName("synonyme");

                entity.Property(e => e.Taufdatum).HasColumnName("taufdatum");

                entity.Property(e => e.Typ).HasColumnName("typ");

                entity.Property(e => e.Vorgaenger)
                    .HasMaxLength(128)
                    .HasColumnName("vorgaenger");

                entity.Property(e => e.Vorname)
                    .HasMaxLength(128)
                    .HasColumnName("vorname");

                entity.Property(e => e.Xid).HasColumnName("xid");

                entity.HasOne(d => d.AufloesungsdatumNavigation)
                    .WithMany(p => p.KontaktAufloesungsdatumNavigations)
                    .HasForeignKey(d => d.Aufloesungsdatum)
                    .HasConstraintName("kontakt_ibfk_11");

                entity.HasOne(d => d.BeerdigungsdatumNavigation)
                    .WithMany(p => p.KontaktBeerdigungsdatumNavigations)
                    .HasForeignKey(d => d.Beerdigungsdatum)
                    .HasConstraintName("kontakt_ibfk_9");

                entity.HasOne(d => d.BenutzerNavigation)
                    .WithMany(p => p.Kontakts)
                    .HasForeignKey(d => d.Benutzer)
                    .HasConstraintName("FK_kontakt_benutzer");

                entity.HasOne(d => d.GeburtsdatumNavigation)
                    .WithMany(p => p.KontaktGeburtsdatumNavigations)
                    .HasForeignKey(d => d.Geburtsdatum)
                    .HasConstraintName("kontakt_ibfk_4");

                entity.HasOne(d => d.GeburtsortNavigation)
                    .WithMany(p => p.KontaktGeburtsortNavigations)
                    .HasForeignKey(d => d.Geburtsort)
                    .HasConstraintName("kontakt_ibfk_5");

                entity.HasOne(d => d.GruendungsdatumNavigation)
                    .WithMany(p => p.KontaktGruendungsdatumNavigations)
                    .HasForeignKey(d => d.Gruendungsdatum)
                    .HasConstraintName("kontakt_ibfk_10");

                entity.HasOne(d => d.OrtNavigation)
                    .WithMany(p => p.KontaktOrtNavigations)
                    .HasForeignKey(d => d.Ort)
                    .HasConstraintName("kontakt_ibfk_2");

                entity.HasOne(d => d.SterbedatumNavigation)
                    .WithMany(p => p.KontaktSterbedatumNavigations)
                    .HasForeignKey(d => d.Sterbedatum)
                    .HasConstraintName("kontakt_ibfk_7");

                entity.HasOne(d => d.SterbeortNavigation)
                    .WithMany(p => p.KontaktSterbeortNavigations)
                    .HasForeignKey(d => d.Sterbeort)
                    .HasConstraintName("kontakt_ibfk_8");

                entity.HasOne(d => d.TaufdatumNavigation)
                    .WithMany(p => p.KontaktTaufdatumNavigations)
                    .HasForeignKey(d => d.Taufdatum)
                    .HasConstraintName("kontakt_ibfk_6");

                entity.HasOne(d => d.TypNavigation)
                    .WithMany(p => p.Kontakts)
                    .HasForeignKey(d => d.Typ)
                    .HasConstraintName("kontakt_ibfk_1");

                entity.HasMany(d => d.Media)
                    .WithMany(p => p.Kontakts)
                    .UsingEntity<Dictionary<string, object>>(
                        "KontaktMedium",
                        l => l.HasOne<Medium>().WithMany().HasForeignKey("Medium").HasConstraintName("kontakt_medium_ibfk_2"),
                        r => r.HasOne<Kontakt>().WithMany().HasForeignKey("Kontakt").HasConstraintName("kontakt_medium_ibfk_1"),
                        j =>
                        {
                            j.HasKey("Kontakt", "Medium").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                            j.ToTable("kontakt_medium").HasCharSet("utf8mb3").UseCollation("utf8_general_ci");

                            j.HasIndex(new[] { "Medium" }, "medium");

                            j.IndexerProperty<int>("Kontakt").HasColumnName("kontakt");

                            j.IndexerProperty<int>("Medium").HasColumnName("medium");
                        });

                entity.HasMany(d => d.Orts)
                    .WithMany(p => p.Kontakts)
                    .UsingEntity<Dictionary<string, object>>(
                        "KontaktOrt",
                        l => l.HasOne<Ort>().WithMany().HasForeignKey("Ort").HasConstraintName("kontakt_ort_ibfk_2"),
                        r => r.HasOne<Kontakt>().WithMany().HasForeignKey("Kontakt").HasConstraintName("kontakt_ort_ibfk_1"),
                        j =>
                        {
                            j.HasKey("Kontakt", "Ort").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                            j.ToTable("kontakt_ort").HasCharSet("utf8mb3").UseCollation("utf8_general_ci");

                            j.HasIndex(new[] { "Ort" }, "ort");

                            j.IndexerProperty<int>("Kontakt").HasColumnName("kontakt");

                            j.IndexerProperty<int>("Ort").HasColumnName("ort");
                        });
            });

            modelBuilder.Entity<Kontakttyp>(entity =>
            {
                entity.ToTable("kontakttyp");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Name, "name")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(10)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Labiale>(entity =>
            {
                entity.ToTable("labiale");

                entity.HasCharSet("latin1")
                    .UseCollation("latin1_swedish_ci");

                entity.HasIndex(e => e.Register, "fk_labialeRegister_idx");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Aufschnitthöhelinks).HasColumnName("aufschnitthöhelinks");

                entity.Property(e => e.Aufschnitthöhemitte).HasColumnName("aufschnitthöhemitte");

                entity.Property(e => e.Aufschnitthöherecht).HasColumnName("aufschnitthöherecht");

                entity.Property(e => e.Baerte)
                    .HasMaxLength(300)
                    .HasColumnName("baerte");

                entity.Property(e => e.Formkoerper)
                    .HasMaxLength(300)
                    .HasColumnName("formkoerper");

                entity.Property(e => e.Fusslänge)
                    .HasMaxLength(300)
                    .HasColumnName("fusslänge");

                entity.Property(e => e.Kommentarlabiale)
                    .HasMaxLength(600)
                    .HasColumnName("kommentarlabiale");

                entity.Property(e => e.Laengekoerper).HasColumnName("laengekoerper");

                entity.Property(e => e.Material).HasColumnName("material");

                entity.Property(e => e.Oberelabiumbreite).HasColumnName("oberelabiumbreite");

                entity.Property(e => e.Positionaktuell)
                    .HasMaxLength(300)
                    .HasColumnName("positionaktuell");

                entity.Property(e => e.Quellen)
                    .HasMaxLength(300)
                    .HasColumnName("quellen");

                entity.Property(e => e.Register).HasColumnName("register");

                entity.Property(e => e.Signaturpfeife)
                    .HasMaxLength(300)
                    .HasColumnName("signaturpfeife");

                entity.Property(e => e.Stimmvorrichtungen)
                    .HasMaxLength(300)
                    .HasColumnName("stimmvorrichtungen");

                entity.Property(e => e.Umfangmitte).HasColumnName("umfangmitte");

                entity.Property(e => e.Umfangoben).HasColumnName("umfangoben");

                entity.Property(e => e.Umfangunten).HasColumnName("umfangunten");

                entity.HasOne(d => d.RegisterNavigation)
                    .WithMany(p => p.Labiales)
                    .HasForeignKey(d => d.Register)
                    .HasConstraintName("fk_labialeRegister");
            });

            modelBuilder.Entity<Laden>(entity =>
            {
                entity.ToTable("laden");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Werk, "laden_ibfk_1");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Dichtungsystemlade)
                    .HasMaxLength(100)
                    .HasColumnName("dichtungsystemlade");

                entity.Property(e => e.Inschriften)
                    .HasMaxLength(300)
                    .HasColumnName("inschriften");

                entity.Property(e => e.Kommentarladen)
                    .HasMaxLength(600)
                    .HasColumnName("kommentarladen");

                entity.Property(e => e.Ladenerhalten)
                    .HasMaxLength(300)
                    .HasColumnName("ladenerhalten");

                entity.Property(e => e.Ladentypen)
                    .HasMaxLength(128)
                    .HasColumnName("ladentypen");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Position).HasColumnName("position");

                entity.Property(e => e.Rasterbrettbeschreibung)
                    .HasMaxLength(300)
                    .HasColumnName("rasterbrettbeschreibung");

                entity.Property(e => e.Tonumfang)
                    .HasMaxLength(128)
                    .HasColumnName("tonumfang");

                entity.Property(e => e.Tonumfangmanualwerke)
                    .HasMaxLength(128)
                    .HasColumnName("tonumfangmanualwerke");

                entity.Property(e => e.Ventilordnunglade)
                    .HasMaxLength(100)
                    .HasColumnName("ventilordnunglade");

                entity.Property(e => e.Werk).HasColumnName("werk");

                entity.Property(e => e.Winddruck)
                    .HasMaxLength(100)
                    .HasColumnName("winddruck");

                entity.Property(e => e.Xid).HasColumnName("xid");

                entity.HasOne(d => d.WerkNavigation)
                    .WithMany(p => p.Ladens)
                    .HasForeignKey(d => d.Werk)
                    .HasConstraintName("laden_ibfk_1");
            });

            modelBuilder.Entity<Land>(entity =>
            {
                entity.ToTable("land");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(64)
                    .HasColumnName("name");

                entity.Property(e => e.Namekurz)
                    .HasMaxLength(16)
                    .HasColumnName("namekurz");
            });

            modelBuilder.Entity<Lastinserted>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("lastinserted");

                entity.Property(e => e.Id).HasColumnName("id");
            });

            modelBuilder.Entity<Literatur>(entity =>
            {
                entity.ToTable("literatur");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Autor)
                    .HasMaxLength(256)
                    .HasColumnName("autor");

                entity.Property(e => e.BiblAngaben)
                    .HasMaxLength(4000)
                    .HasColumnName("biblAngaben");

                entity.Property(e => e.Signatur)
                    .HasMaxLength(30)
                    .HasColumnName("signatur");

                entity.Property(e => e.Titel)
                    .HasMaxLength(1024)
                    .HasColumnName("titel");
            });

            modelBuilder.Entity<LiteraturKontakt>(entity =>
            {
                entity.HasKey(e => new { e.Kontakt, e.Literatur })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("literatur_kontakt");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Literatur, "literatur");

                entity.Property(e => e.Kontakt).HasColumnName("kontakt");

                entity.Property(e => e.Literatur).HasColumnName("literatur");

                entity.Property(e => e.Seitenangabe)
                    .HasMaxLength(50)
                    .HasColumnName("seitenangabe");

                entity.HasOne(d => d.KontaktNavigation)
                    .WithMany(p => p.LiteraturKontakts)
                    .HasForeignKey(d => d.Kontakt)
                    .HasConstraintName("literatur_kontakt_ibfk_2");

                entity.HasOne(d => d.LiteraturNavigation)
                    .WithMany(p => p.LiteraturKontakts)
                    .HasForeignKey(d => d.Literatur)
                    .HasConstraintName("literatur_kontakt_ibfk_1");
            });

            modelBuilder.Entity<LiteraturMassnahme>(entity =>
            {
                entity.HasKey(e => new { e.Massnahme, e.Literatur })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("literatur_massnahme");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Literatur, "literatur");

                entity.Property(e => e.Massnahme).HasColumnName("massnahme");

                entity.Property(e => e.Literatur).HasColumnName("literatur");

                entity.Property(e => e.Seitenangabe)
                    .HasMaxLength(50)
                    .HasColumnName("seitenangabe");

                entity.HasOne(d => d.LiteraturNavigation)
                    .WithMany(p => p.LiteraturMassnahmes)
                    .HasForeignKey(d => d.Literatur)
                    .HasConstraintName("literatur_massnahme_ibfk_1");

                entity.HasOne(d => d.MassnahmeNavigation)
                    .WithMany(p => p.LiteraturMassnahmes)
                    .HasForeignKey(d => d.Massnahme)
                    .HasConstraintName("literatur_massnahme_ibfk_2");
            });

            modelBuilder.Entity<Massnahme>(entity =>
            {
                entity.ToTable("massnahme");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Orgel, "massnahme_orgel_i");

                entity.HasIndex(e => e.Massnahmedatum, "massnahmedatum");

                entity.HasIndex(e => e.Ort, "ort");

                entity.HasIndex(e => e.Benutzer, "urheber");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AnzahlPfeiffen).HasColumnName("anzahlPfeiffen");

                entity.Property(e => e.Anzahlauszuege).HasColumnName("anzahlauszuege");

                entity.Property(e => e.Anzahlfreierregisterpositionen).HasColumnName("anzahlfreierregisterpositionen");

                entity.Property(e => e.Anzahlgeplantermanuale).HasColumnName("anzahlgeplantermanuale");

                entity.Property(e => e.Anzahlmanuale).HasColumnName("anzahlmanuale");

                entity.Property(e => e.Anzahlmanualwerke).HasColumnName("anzahlmanualwerke");

                entity.Property(e => e.Anzahlpedal).HasColumnName("anzahlpedal");

                entity.Property(e => e.Anzahlpfeifenreihen).HasColumnName("anzahlpfeifenreihen");

                entity.Property(e => e.Anzahlregister).HasColumnName("anzahlregister");

                entity.Property(e => e.Anzahlsammelzuege).HasColumnName("anzahlsammelzuege");

                entity.Property(e => e.Anzahltransmissionen).HasColumnName("anzahltransmissionen");

                entity.Property(e => e.Anzahlverlaengerungen).HasColumnName("anzahlverlaengerungen");

                entity.Property(e => e.Balganlage)
                    .HasMaxLength(128)
                    .HasColumnName("balganlage");

                entity.Property(e => e.Balganlageerhalten)
                    .HasMaxLength(300)
                    .HasColumnName("balganlageerhalten");

                entity.Property(e => e.Balganlagetext)
                    .HasMaxLength(600)
                    .HasColumnName("balganlagetext");

                entity.Property(e => e.BassRegister).HasColumnName("bassRegister");

                entity.Property(e => e.Benutzer).HasColumnName("benutzer");

                entity.Property(e => e.DiskantRegister).HasColumnName("diskantRegister");

                entity.Property(e => e.Historischekomponenten)
                    .HasMaxLength(1024)
                    .HasColumnName("historischekomponenten");

                entity.Property(e => e.InschriftenFimenschild)
                    .HasMaxLength(500)
                    .HasColumnName("inschriftenFimenschild");

                entity.Property(e => e.Intonation)
                    .HasMaxLength(128)
                    .HasColumnName("intonation");

                entity.Property(e => e.Istsichtbar).HasColumnName("istsichtbar");

                entity.Property(e => e.Klang)
                    .HasMaxLength(128)
                    .HasColumnName("klang");

                entity.Property(e => e.Kommentar)
                    .HasMaxLength(4000)
                    .HasColumnName("kommentar");

                entity.Property(e => e.Koppelmanual)
                    .HasMaxLength(128)
                    .HasColumnName("koppelmanual");

                entity.Property(e => e.Massnahme1)
                    .HasMaxLength(128)
                    .HasColumnName("massnahme");

                entity.Property(e => e.Massnahmedatum).HasColumnName("massnahmedatum");

                entity.Property(e => e.Massnahmekosteneffektiv)
                    .HasMaxLength(128)
                    .HasColumnName("massnahmekosteneffektiv");

                entity.Property(e => e.Massnahmekostenofferte)
                    .HasMaxLength(128)
                    .HasColumnName("massnahmekostenofferte");

                entity.Property(e => e.Massnahmeopusnummer)
                    .HasMaxLength(128)
                    .HasColumnName("massnahmeopusnummer");

                entity.Property(e => e.Nebenregister).HasMaxLength(1024);

                entity.Property(e => e.Orgel).HasColumnName("orgel");

                entity.Property(e => e.Ort).HasColumnName("ort");

                entity.Property(e => e.Positionbalganlage)
                    .HasMaxLength(400)
                    .HasColumnName("positionbalganlage");

                entity.Property(e => e.Positionspieltisch)
                    .HasMaxLength(600)
                    .HasColumnName("positionspieltisch");

                entity.Property(e => e.Quellen)
                    .HasMaxLength(1024)
                    .HasColumnName("quellen");

                entity.Property(e => e.Spielhilfen)
                    .HasMaxLength(1024)
                    .HasColumnName("spielhilfen");

                entity.Property(e => e.Spieltischerhalten)
                    .HasMaxLength(300)
                    .HasColumnName("spieltischerhalten");

                entity.Property(e => e.Spieltischspielschrank)
                    .HasMaxLength(128)
                    .HasColumnName("spieltischspielschrank");

                entity.Property(e => e.Stimmtonhoehe)
                    .HasMaxLength(64)
                    .HasColumnName("stimmtonhoehe");

                entity.Property(e => e.Temperierung)
                    .HasMaxLength(128)
                    .HasColumnName("temperierung");

                entity.Property(e => e.Textdisposition)
                    .HasMaxLength(2000)
                    .HasColumnName("textdisposition");

                entity.Property(e => e.TexttemperierungStimmton)
                    .HasMaxLength(600)
                    .HasColumnName("texttemperierung_stimmton");

                entity.Property(e => e.Unterhalt)
                    .HasMaxLength(128)
                    .HasColumnName("unterhalt");

                entity.Property(e => e.Winderzeugung)
                    .HasMaxLength(128)
                    .HasColumnName("winderzeugung");

                entity.HasOne(d => d.BenutzerNavigation)
                    .WithMany(p => p.Massnahmes)
                    .HasForeignKey(d => d.Benutzer)
                    .HasConstraintName("FK_massnahme_benutzer");

                entity.HasOne(d => d.MassnahmedatumNavigation)
                    .WithMany(p => p.Massnahmes)
                    .HasForeignKey(d => d.Massnahmedatum)
                    .HasConstraintName("massnahme_ibfk_4");

                entity.HasOne(d => d.OrgelNavigation)
                    .WithMany(p => p.Massnahmes)
                    .HasForeignKey(d => d.Orgel)
                    .HasConstraintName("massnahme_ibfk_1");

                entity.HasOne(d => d.OrtNavigation)
                    .WithMany(p => p.Massnahmes)
                    .HasForeignKey(d => d.Ort)
                    .HasConstraintName("massnahme_ibfk_2");

                entity.HasMany(d => d.Kontakts)
                    .WithMany(p => p.Massnahmes)
                    .UsingEntity<Dictionary<string, object>>(
                        "MassnahmeKontakt",
                        l => l.HasOne<Kontakt>().WithMany().HasForeignKey("Kontakt").HasConstraintName("massnahme_kontakt_ibfk_2"),
                        r => r.HasOne<Massnahme>().WithMany().HasForeignKey("Massnahme").HasConstraintName("massnahme_kontakt_ibfk_1"),
                        j =>
                        {
                            j.HasKey("Massnahme", "Kontakt").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                            j.ToTable("massnahme_kontakt").HasCharSet("utf8mb3").UseCollation("utf8_general_ci");

                            j.HasIndex(new[] { "Kontakt" }, "kontakt");

                            j.IndexerProperty<int>("Massnahme").HasColumnName("massnahme");

                            j.IndexerProperty<int>("Kontakt").HasColumnName("kontakt");
                        });

                entity.HasMany(d => d.Media)
                    .WithMany(p => p.Massnahmes)
                    .UsingEntity<Dictionary<string, object>>(
                        "MassnahmeMedium",
                        l => l.HasOne<Medium>().WithMany().HasForeignKey("Medium").HasConstraintName("massnahme_medium_ibfk_2"),
                        r => r.HasOne<Massnahme>().WithMany().HasForeignKey("Massnahme").HasConstraintName("massnahme_medium_ibfk_1"),
                        j =>
                        {
                            j.HasKey("Massnahme", "Medium").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                            j.ToTable("massnahme_medium").HasCharSet("utf8mb3").UseCollation("utf8_general_ci");

                            j.HasIndex(new[] { "Medium" }, "medium");

                            j.IndexerProperty<int>("Massnahme").HasColumnName("massnahme");

                            j.IndexerProperty<int>("Medium").HasColumnName("medium");
                        });
            });

            modelBuilder.Entity<Medium>(entity =>
            {
                entity.ToTable("medium");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Datum, "datum");

                entity.HasIndex(e => e.Mediumtyp, "mediumtyp");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Beschreibung)
                    .HasMaxLength(1024)
                    .HasColumnName("beschreibung");

                entity.Property(e => e.Daten).HasColumnName("daten");

                entity.Property(e => e.Datum).HasColumnName("datum");

                entity.Property(e => e.Erfasstam).HasColumnName("erfasstam");

                entity.Property(e => e.Mediumtyp).HasColumnName("mediumtyp");

                entity.Property(e => e.Name)
                    .HasMaxLength(256)
                    .HasColumnName("name");

                entity.HasOne(d => d.DatumNavigation)
                    .WithMany(p => p.Media)
                    .HasForeignKey(d => d.Datum)
                    .HasConstraintName("medium_ibfk_2");

                entity.HasOne(d => d.MediumtypNavigation)
                    .WithMany(p => p.Media)
                    .HasForeignKey(d => d.Mediumtyp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("medium_ibfk_1");
            });

            modelBuilder.Entity<Mediumtyp>(entity =>
            {
                entity.ToTable("mediumtyp");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Dateiendung)
                    .HasMaxLength(16)
                    .HasColumnName("dateiendung");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Mixturkornette>(entity =>
            {
                entity.ToTable("mixturkornette");

                entity.HasCharSet("latin1")
                    .UseCollation("latin1_swedish_ci");

                entity.HasIndex(e => e.Register, "fk_mixturkornetteRegister_idx");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Kommentarmixturen)
                    .HasMaxLength(600)
                    .HasColumnName("kommentarmixturen");

                entity.Property(e => e.Positionaktuell)
                    .HasMaxLength(300)
                    .HasColumnName("positionaktuell");

                entity.Property(e => e.Quellen)
                    .HasMaxLength(300)
                    .HasColumnName("quellen");

                entity.Property(e => e.Register).HasColumnName("register");

                entity.Property(e => e.Repetitionton).HasColumnName("repetitionton");

                entity.Property(e => e.Signaturpfeife)
                    .HasMaxLength(300)
                    .HasColumnName("signaturpfeife");

                entity.Property(e => e.Tonhoehe)
                    .HasMaxLength(300)
                    .HasColumnName("tonhoehe");

                entity.HasOne(d => d.RegisterNavigation)
                    .WithMany(p => p.Mixturkornettes)
                    .HasForeignKey(d => d.Register)
                    .HasConstraintName("fk_mixturkornetteRegister");
            });

            modelBuilder.Entity<Orgel>(entity =>
            {
                entity.ToTable("orgel");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Datumbaugebaude, "datumbaugebaude");

                entity.HasIndex(e => e.Idorgelvorher, "idorgelvorher");

                entity.HasIndex(e => e.Neubaudatum, "neubaudatum");

                entity.HasIndex(e => e.Ort, "ort");

                entity.HasIndex(e => e.Id, "p_orgel_id_i")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Adresse)
                    .HasMaxLength(128)
                    .HasColumnName("adresse");

                entity.Property(e => e.Bezeichnung)
                    .HasMaxLength(128)
                    .HasColumnName("bezeichnung");

                entity.Property(e => e.Datumbaugebaude).HasColumnName("datumbaugebaude");

                entity.Property(e => e.Eigentuemer)
                    .HasMaxLength(128)
                    .HasColumnName("eigentuemer");

                entity.Property(e => e.Gebaeude)
                    .HasMaxLength(128)
                    .HasColumnName("gebaeude");

                entity.Property(e => e.Gebaeudeteil)
                    .HasMaxLength(128)
                    .HasColumnName("gebaeudeteil");

                entity.Property(e => e.Gemeinde)
                    .HasMaxLength(128)
                    .HasColumnName("gemeinde");

                entity.Property(e => e.Idorgelvorher).HasColumnName("idorgelvorher");

                entity.Property(e => e.Istsichbar).HasColumnName("istsichbar");

                entity.Property(e => e.Konfession)
                    .HasMaxLength(128)
                    .HasColumnName("konfession");

                entity.Property(e => e.Latitude)
                    .HasMaxLength(50)
                    .HasColumnName("latitude");

                entity.Property(e => e.Longitude)
                    .HasMaxLength(50)
                    .HasColumnName("longitude");

                entity.Property(e => e.Neubaudatum).HasColumnName("neubaudatum");

                entity.Property(e => e.Orgelerhalten)
                    .HasMaxLength(300)
                    .HasColumnName("orgelerhalten");

                entity.Property(e => e.Orgelnummer)
                    .HasMaxLength(128)
                    .HasColumnName("orgelnummer");

                entity.Property(e => e.Ort).HasColumnName("ort");

                entity.Property(e => e.Ortsteil)
                    .HasMaxLength(128)
                    .HasColumnName("ortsteil");

                entity.Property(e => e.Pfarre)
                    .HasMaxLength(128)
                    .HasColumnName("pfarre");

                entity.HasOne(d => d.DatumbaugebaudeNavigation)
                    .WithMany(p => p.OrgelDatumbaugebaudeNavigations)
                    .HasForeignKey(d => d.Datumbaugebaude)
                    .HasConstraintName("orgel_ibfk_3");

                entity.HasOne(d => d.IdorgelvorherNavigation)
                    .WithMany(p => p.InverseIdorgelvorherNavigation)
                    .HasForeignKey(d => d.Idorgelvorher)
                    .HasConstraintName("orgel_ibfk_4");

                entity.HasOne(d => d.NeubaudatumNavigation)
                    .WithMany(p => p.OrgelNeubaudatumNavigations)
                    .HasForeignKey(d => d.Neubaudatum)
                    .HasConstraintName("orgel_ibfk_1");

                entity.HasOne(d => d.OrtNavigation)
                    .WithMany(p => p.Orgels)
                    .HasForeignKey(d => d.Ort)
                    .HasConstraintName("orgel_ibfk_2");

                entity.HasMany(d => d.Kontakts)
                    .WithMany(p => p.Orgels)
                    .UsingEntity<Dictionary<string, object>>(
                        "OrgelKontakt",
                        l => l.HasOne<Kontakt>().WithMany().HasForeignKey("Kontakt").HasConstraintName("orgel_kontakt_ibfk_2"),
                        r => r.HasOne<Orgel>().WithMany().HasForeignKey("Orgel").HasConstraintName("orgel_kontakt_ibfk_1"),
                        j =>
                        {
                            j.HasKey("Orgel", "Kontakt").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                            j.ToTable("orgel_kontakt").HasCharSet("utf8mb3").UseCollation("utf8_general_ci");

                            j.HasIndex(new[] { "Kontakt" }, "kontakt");

                            j.IndexerProperty<int>("Orgel").HasColumnName("orgel");

                            j.IndexerProperty<int>("Kontakt").HasColumnName("kontakt");
                        });
            });

            modelBuilder.Entity<Ort>(entity =>
            {
                entity.ToTable("ort");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Kanton, "kanton");

                entity.HasIndex(e => e.Land, "land");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Kanton).HasColumnName("kanton");

                entity.Property(e => e.Land).HasColumnName("land");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Namevariante1)
                    .HasMaxLength(128)
                    .HasColumnName("namevariante1");

                entity.Property(e => e.Namevariante2)
                    .HasMaxLength(128)
                    .HasColumnName("namevariante2");

                entity.Property(e => e.Namevariante3)
                    .HasMaxLength(128)
                    .HasColumnName("namevariante3");

                entity.Property(e => e.Plz)
                    .HasMaxLength(10)
                    .HasColumnName("plz");

                entity.HasOne(d => d.KantonNavigation)
                    .WithMany(p => p.Orts)
                    .HasForeignKey(d => d.Kanton)
                    .HasConstraintName("ort_ibfk_1");

                entity.HasOne(d => d.LandNavigation)
                    .WithMany(p => p.Orts)
                    .HasForeignKey(d => d.Land)
                    .HasConstraintName("ort_ibfk_2");
            });

            modelBuilder.Entity<Register>(entity =>
            {
                entity.ToTable("register");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Laden, "register_ibfk_1");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Idorgelnachher).HasColumnName("idorgelnachher");

                entity.Property(e => e.Idorgelvorher).HasColumnName("idorgelvorher");

                entity.Property(e => e.Kommentar)
                    .HasMaxLength(1024)
                    .HasColumnName("kommentar");

                entity.Property(e => e.Laden).HasColumnName("laden");

                entity.Property(e => e.Material)
                    .HasMaxLength(300)
                    .HasColumnName("material");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Position).HasColumnName("position");

                entity.Property(e => e.Positionlade).HasColumnName("positionlade");

                entity.Property(e => e.Registererhalten)
                    .HasMaxLength(300)
                    .HasColumnName("registererhalten");

                entity.Property(e => e.Tonhoehe)
                    .HasMaxLength(128)
                    .HasColumnName("tonhoehe");

                entity.Property(e => e.Xid).HasColumnName("xid");

                entity.HasOne(d => d.LadenNavigation)
                    .WithMany(p => p.Registers)
                    .HasForeignKey(d => d.Laden)
                    .HasConstraintName("register_ibfk_1");
            });

            modelBuilder.Entity<Rolle>(entity =>
            {
                entity.ToTable("rolle");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(32)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Sessionlog>(entity =>
            {
                entity.ToTable("sessionlog");

                entity.HasCharSet("latin1")
                    .UseCollation("latin1_swedish_ci");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Datum)
                    .HasColumnType("datetime")
                    .HasColumnName("datum");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.UserName)
                    .HasMaxLength(45)
                    .HasColumnName("userName");
            });

            modelBuilder.Entity<T>(entity =>
            {
                entity.ToTable("t");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Datum, "datum");

                entity.HasIndex(e => e.Mediumtyp, "mediumtyp");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Beschreibung)
                    .HasMaxLength(1024)
                    .HasColumnName("beschreibung");

                entity.Property(e => e.Daten).HasColumnName("daten");

                entity.Property(e => e.Datum).HasColumnName("datum");

                entity.Property(e => e.Erfasstam).HasColumnName("erfasstam");

                entity.Property(e => e.Mediumtyp).HasColumnName("mediumtyp");

                entity.Property(e => e.Name)
                    .HasMaxLength(256)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Tastenreihe>(entity =>
            {
                entity.ToTable("tastenreihe");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Massnahme, "tastenreihe_ibfk_1");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Anzahlauszuege).HasColumnName("anzahlauszuege");

                entity.Property(e => e.Anzahlsammelzuege).HasColumnName("anzahlsammelzuege");

                entity.Property(e => e.Anzahltransmissionen).HasColumnName("anzahltransmissionen");

                entity.Property(e => e.Anzahlverlaengerungen).HasColumnName("anzahlverlaengerungen");

                entity.Property(e => e.Erhalten)
                    .HasMaxLength(300)
                    .HasColumnName("erhalten");

                entity.Property(e => e.Klaviaturerhalten)
                    .HasMaxLength(300)
                    .HasColumnName("klaviaturerhalten");

                entity.Property(e => e.Kommentartastenreihe)
                    .HasMaxLength(500)
                    .HasColumnName("kommentartastenreihe");

                entity.Property(e => e.Koppelmanual)
                    .HasMaxLength(128)
                    .HasColumnName("koppelmanual");

                entity.Property(e => e.Manualeerhalten)
                    .HasMaxLength(300)
                    .HasColumnName("manualeerhalten");

                entity.Property(e => e.Massnahme).HasColumnName("massnahme");

                entity.Property(e => e.Materialpedaltasten)
                    .HasMaxLength(128)
                    .HasColumnName("materialpedaltasten");

                entity.Property(e => e.Materialtasten)
                    .HasMaxLength(128)
                    .HasColumnName("materialtasten");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Nebenregister).HasColumnName("nebenregister");

                entity.Property(e => e.Obertastenlaenge).HasColumnName("obertastenlaenge");

                entity.Property(e => e.Pedalerhalten)
                    .HasMaxLength(300)
                    .HasColumnName("pedalerhalten");

                entity.Property(e => e.Pedalklaviaturstellung)
                    .HasMaxLength(200)
                    .HasColumnName("pedalklaviaturstellung");

                entity.Property(e => e.Pedaltyp)
                    .HasMaxLength(128)
                    .HasColumnName("pedaltyp");

                entity.Property(e => e.Position).HasColumnName("position");

                entity.Property(e => e.Registerbeschriftung)
                    .HasMaxLength(300)
                    .HasColumnName("registerbeschriftung");

                entity.Property(e => e.Registertraktur)
                    .HasMaxLength(128)
                    .HasColumnName("registertraktur");

                entity.Property(e => e.Registertrakturerhalten)
                    .HasMaxLength(300)
                    .HasColumnName("registertrakturerhalten");

                entity.Property(e => e.Spieltraktur)
                    .HasMaxLength(128)
                    .HasColumnName("spieltraktur");

                entity.Property(e => e.Spieltrakturerhalten)
                    .HasMaxLength(300)
                    .HasColumnName("spieltrakturerhalten");

                entity.Property(e => e.Stichmass)
                    .HasMaxLength(100)
                    .HasColumnName("stichmass");

                entity.Property(e => e.Subsemitonien)
                    .HasMaxLength(300)
                    .HasColumnName("subsemitonien");

                entity.Property(e => e.Tastendruck)
                    .HasMaxLength(300)
                    .HasColumnName("tastendruck");

                entity.Property(e => e.Tastenhebel)
                    .HasMaxLength(100)
                    .HasColumnName("tastenhebel");

                entity.Property(e => e.Tastenlaengepedalsichtbar)
                    .HasMaxLength(300)
                    .HasColumnName("tastenlaengepedalsichtbar");

                entity.Property(e => e.Tastenumfang)
                    .HasMaxLength(128)
                    .HasColumnName("tastenumfang");

                entity.Property(e => e.Tastenumfangpedal)
                    .HasMaxLength(128)
                    .HasColumnName("tastenumfangpedal");

                entity.Property(e => e.Tiefeoktave)
                    .HasMaxLength(128)
                    .HasColumnName("tiefeoktave");

                entity.Property(e => e.Tiefeoktavepedal)
                    .HasMaxLength(128)
                    .HasColumnName("tiefeoktavepedal");

                entity.Property(e => e.Typusregisterzuege)
                    .HasMaxLength(128)
                    .HasColumnName("typusregisterzuege");

                entity.Property(e => e.Untertastenlaenge).HasColumnName("untertastenlaenge");

                entity.Property(e => e.Vorderteillaenge).HasColumnName("vorderteillaenge");

                entity.Property(e => e.Xid).HasColumnName("xid");

                entity.HasOne(d => d.MassnahmeNavigation)
                    .WithMany(p => p.Tastenreihes)
                    .HasForeignKey(d => d.Massnahme)
                    .HasConstraintName("tastenreihe_ibfk_1");
            });

            modelBuilder.Entity<Tregpo>(entity =>
            {
                entity.ToTable("tregpos");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Laden).HasColumnName("laden");

                entity.Property(e => e.Position).HasColumnName("position");
            });

            modelBuilder.Entity<Tt>(entity =>
            {
                entity.ToTable("tt");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Datum, "datum");

                entity.HasIndex(e => e.Mediumtyp, "mediumtyp");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Beschreibung)
                    .HasMaxLength(1024)
                    .HasColumnName("beschreibung");

                entity.Property(e => e.Daten).HasColumnName("daten");

                entity.Property(e => e.Datum).HasColumnName("datum");

                entity.Property(e => e.Erfasstam).HasColumnName("erfasstam");

                entity.Property(e => e.Mediumtyp).HasColumnName("mediumtyp");

                entity.Property(e => e.Name)
                    .HasMaxLength(256)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Useddatum>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("useddatum");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.Property(e => e.Id).HasColumnName("id");
            });

            modelBuilder.Entity<Uservw>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("uservw");

                entity.Property(e => e.User)
                    .HasMaxLength(288)
                    .HasColumnName("user()")
                    .HasDefaultValueSql("''")
                    .UseCollation("utf8_general_ci")
                    .HasCharSet("utf8mb3");
            });

            modelBuilder.Entity<Werk>(entity =>
            {
                entity.ToTable("werk");

                entity.HasCharSet("utf8mb3")
                    .UseCollation("utf8_general_ci");

                entity.HasIndex(e => e.Tastenreihe, "werk_ibfk_1");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Kommentarwerk)
                    .HasMaxLength(600)
                    .HasColumnName("kommentarwerk");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Position).HasColumnName("position");

                entity.Property(e => e.Tastenreihe).HasColumnName("tastenreihe");

                entity.Property(e => e.Werkschwellbar)
                    .HasMaxLength(300)
                    .HasColumnName("werkschwellbar");

                entity.Property(e => e.Xid).HasColumnName("xid");

                entity.HasOne(d => d.TastenreiheNavigation)
                    .WithMany(p => p.Werks)
                    .HasForeignKey(d => d.Tastenreihe)
                    .HasConstraintName("werk_ibfk_1");
            });

            modelBuilder.Entity<Zungen>(entity =>
            {
                entity.ToTable("zungen");

                entity.HasCharSet("latin1")
                    .UseCollation("latin1_swedish_ci");

                entity.HasIndex(e => e.Register, "fk_zungenRegister_idx");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Form)
                    .HasMaxLength(300)
                    .HasColumnName("form");

                entity.Property(e => e.Kehleform)
                    .HasMaxLength(300)
                    .HasColumnName("kehleform");

                entity.Property(e => e.Kehlematerial)
                    .HasMaxLength(300)
                    .HasColumnName("kehlematerial");

                entity.Property(e => e.Kommentarzungen)
                    .HasMaxLength(600)
                    .HasColumnName("kommentarzungen");

                entity.Property(e => e.Krueckematerial)
                    .HasMaxLength(300)
                    .HasColumnName("krueckematerial");

                entity.Property(e => e.Laengekoerper).HasColumnName("laengekoerper");

                entity.Property(e => e.Material)
                    .HasMaxLength(300)
                    .HasColumnName("material");

                entity.Property(e => e.Positionaktuell)
                    .HasMaxLength(300)
                    .HasColumnName("positionaktuell");

                entity.Property(e => e.Quellen)
                    .HasMaxLength(300)
                    .HasColumnName("quellen");

                entity.Property(e => e.Register).HasColumnName("register");

                entity.Property(e => e.Signaturpfeife)
                    .HasMaxLength(300)
                    .HasColumnName("signaturpfeife");

                entity.Property(e => e.Umfangmitte).HasColumnName("umfangmitte");

                entity.Property(e => e.Umfangoben).HasColumnName("umfangoben");

                entity.Property(e => e.Umfangunten).HasColumnName("umfangunten");

                entity.Property(e => e.Zungenbreiteoben).HasColumnName("zungenbreiteoben");

                entity.Property(e => e.Zungenbreiteunten).HasColumnName("zungenbreiteunten");

                entity.Property(e => e.Zungendicke).HasColumnName("zungendicke");

                entity.HasOne(d => d.RegisterNavigation)
                    .WithMany(p => p.Zungens)
                    .HasForeignKey(d => d.Register)
                    .HasConstraintName("fk_zungenRegister");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
