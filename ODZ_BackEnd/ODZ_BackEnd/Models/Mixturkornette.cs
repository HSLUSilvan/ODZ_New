using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Mixturkornette
    {
        public int Id { get; set; }
        public int Register { get; set; }
        public string? Signaturpfeife { get; set; }
        public string? Positionaktuell { get; set; }
        public int? Repetitionton { get; set; }
        public string? Tonhoehe { get; set; }
        public string? Quellen { get; set; }
        public string? Kommentarmixturen { get; set; }

        [JsonIgnore] public virtual Register RegisterNavigation { get; set; } = null!;
    }
}
