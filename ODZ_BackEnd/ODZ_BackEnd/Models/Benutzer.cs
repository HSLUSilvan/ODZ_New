using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Benutzer
    {
        public Benutzer()
        {
            Aenderungs = new HashSet<Aenderung>();
            Kontakts = new HashSet<Kontakt>();
            Massnahmes = new HashSet<Massnahme>();
        }
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        [JsonIgnore]
        public string? Passwort { get; set; }
        [JsonIgnore]
        public int? Rolle { get; set; }
        [JsonIgnore]
        public string? Bemerkung { get; set; }
        [JsonIgnore]
        public int? Istgeloescht { get; set; }
        [JsonIgnore]

        public virtual Rolle? RolleNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Aenderung> Aenderungs { get; set; }
        [JsonIgnore]
        public virtual ICollection<Kontakt> Kontakts { get; set; }
        [JsonIgnore]
        public virtual ICollection<Massnahme> Massnahmes { get; set; }
    }
}
