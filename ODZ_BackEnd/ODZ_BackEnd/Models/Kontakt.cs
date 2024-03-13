using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Kontakt
    {
        public Kontakt()
        {
            LiteraturKontakts = new HashSet<LiteraturKontakt>();
            Massnahmes = new HashSet<Massnahme>();
            Media = new HashSet<Medium>();
            Orgels = new HashSet<Orgel>();
            Orts = new HashSet<Ort>();
        }

        public int Id { get; set; }
        public int? Typ { get; set; }
        public int? Ort { get; set; }
        public string? Adresse { get; set; }
        public string? Kommentar { get; set; }
        public int? Benutzer { get; set; }
        public string? Quelle { get; set; }
        public int? Istorgelexperte { get; set; }
        public int? Istorgelbauer { get; set; }
        public int? Isturheber { get; set; }
        public string? Name { get; set; }
        public string? Vorname { get; set; }
        public string? Synonyme { get; set; }
        public int? Geburtsdatum { get; set; }
        public int? Geburtsort { get; set; }
        public int? Taufdatum { get; set; }
        public string? Namemutter { get; set; }
        public string? Namevater { get; set; }
        public int? Sterbedatum { get; set; }
        public int? Sterbeort { get; set; }
       public int? Beerdigungsdatum { get; set; }
        public string? Generation { get; set; }
        public string? Name1 { get; set; }
        public string? Name2 { get; set; }
        public string? Firmentyp { get; set; }
        public string? Vorgaenger { get; set; }
        public int? Gruendungsdatum { get; set; }
        public int? Aufloesungsdatum { get; set; }
        public string? Nachfolger { get; set; }
        public string? PBez { get; set; }
        public int? Xid { get; set; }
        public int? Istsichbar { get; set; }

        [JsonIgnore] public virtual Datum? AufloesungsdatumNavigation { get; set; }
        [JsonIgnore] public virtual Datum? BeerdigungsdatumNavigation { get; set; }
        [JsonIgnore] public virtual Benutzer? BenutzerNavigation { get; set; }
        [JsonIgnore] public virtual Datum? GeburtsdatumNavigation { get; set; }
        [JsonIgnore] public virtual Ort? GeburtsortNavigation { get; set; }
        [JsonIgnore] public virtual Datum? GruendungsdatumNavigation { get; set; }
        [JsonIgnore] public virtual Ort? OrtNavigation { get; set; }
        [JsonIgnore] public virtual Datum? SterbedatumNavigation { get; set; }
        [JsonIgnore] public virtual Ort? SterbeortNavigation { get; set; }
        [JsonIgnore] public virtual Datum? TaufdatumNavigation { get; set; }
        [JsonIgnore] public virtual Kontakttyp? TypNavigation { get; set; }
        [JsonIgnore] public virtual ICollection<LiteraturKontakt> LiteraturKontakts { get; set; }

        [JsonIgnore] public virtual ICollection<Massnahme> Massnahmes { get; set; }
        [JsonIgnore] public virtual ICollection<Medium> Media { get; set; }
        [JsonIgnore] public virtual ICollection<Orgel> Orgels { get; set; }
        [JsonIgnore] public virtual ICollection<Ort> Orts { get; set; }
    }
}
