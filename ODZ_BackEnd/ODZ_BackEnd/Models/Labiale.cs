using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Labiale
    {
        public int Id { get; set; }
        public int Register { get; set; }
        public string? Signaturpfeife { get; set; }
        public string? Positionaktuell { get; set; }
        public string? Formkoerper { get; set; }
        public float? Laengekoerper { get; set; }
        public float? Material { get; set; }
        public float? Umfangunten { get; set; }
        public float? Umfangmitte { get; set; }
        public float? Umfangoben { get; set; }
        public float? Aufschnitthöhelinks { get; set; }
        public float? Aufschnitthöhemitte { get; set; }
        public float? Aufschnitthöherecht { get; set; }
        public float? Oberelabiumbreite { get; set; }
        public string? Baerte { get; set; }
        public string? Stimmvorrichtungen { get; set; }
        public string? Fusslänge { get; set; }
        public string? Quellen { get; set; }
        public string? Kommentarlabiale { get; set; }

        [JsonIgnore] public virtual Register RegisterNavigation { get; set; } = null!;
    }
}
