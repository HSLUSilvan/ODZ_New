using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Orgel
    {
        public Orgel()
        {
            InverseIdorgelvorherNavigation = new HashSet<Orgel>();
            Massnahmes = new HashSet<Massnahme>();
            Kontakts = new HashSet<Kontakt>();
        }

        public int Id { get; set; }
        
       public string? Orgelnummer { get; set; }

        public string? Bezeichnung { get; set; }
        public int? Neubaudatum { get; set; }
       
        public int? Istsichbar { get; set; }
        public int? Ort { get; set; }
        public string? Gemeinde { get; set; }
        public string? Ortsteil { get; set; }
        public string? Adresse { get; set; }
        public string? Gebaeude { get; set; }
        public string? Gebaeudeteil { get; set; }
        public string? Pfarre { get; set; }
        public string? Konfession { get; set; }
        public int? Datumbaugebaude { get; set; }
        public string? Eigentuemer { get; set; }
        public string? Orgelerhalten { get; set; }
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }
        public int? Idorgelvorher { get; set; }

        [JsonIgnore] public virtual Datum? DatumbaugebaudeNavigation { get; set; }
        [JsonIgnore] public virtual Orgel? IdorgelvorherNavigation { get; set; }
        [JsonIgnore] public virtual Datum? NeubaudatumNavigation { get; set; }
        [JsonIgnore] public virtual Ort? OrtNavigation { get; set; }
        [JsonIgnore] public virtual ICollection<Orgel> InverseIdorgelvorherNavigation { get; set; }
        [JsonIgnore] public virtual ICollection<Massnahme> Massnahmes { get; set; }

        [JsonIgnore] public virtual ICollection<Kontakt> Kontakts { get; set; }
    }
}
