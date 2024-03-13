using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class LiteraturMassnahme
    {
        public int Literatur { get; set; }
        public int Massnahme { get; set; }
        public string? Seitenangabe { get; set; }

        public virtual Literatur LiteraturNavigation { get; set; } = null!;
        [JsonIgnore] public virtual Massnahme MassnahmeNavigation { get; set; } = null!;
    }
}
