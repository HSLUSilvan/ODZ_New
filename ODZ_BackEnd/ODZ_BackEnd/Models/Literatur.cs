using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Literatur
    {
        public Literatur()
        {
            LiteraturKontakts = new HashSet<LiteraturKontakt>();
            LiteraturMassnahmes = new HashSet<LiteraturMassnahme>();
        }

        public int Id { get; set; }
        public string? Autor { get; set; }
        public string Titel { get; set; } = null!;
        public string? BiblAngaben { get; set; }
        public string? Signatur { get; set; }

        public virtual ICollection<LiteraturKontakt> LiteraturKontakts { get; set; }
        [JsonIgnore] public virtual ICollection<LiteraturMassnahme> LiteraturMassnahmes { get; set; }
    }
}
