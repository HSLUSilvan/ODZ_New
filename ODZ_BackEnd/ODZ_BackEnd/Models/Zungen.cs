using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Zungen
    {
        public int Id { get; set; }
        public int Register { get; set; }
        public string? Signaturpfeife { get; set; }
        public string? Positionaktuell { get; set; }
        public string? Form { get; set; }
        public float? Laengekoerper { get; set; }
        public string? Material { get; set; }
        public float? Umfangunten { get; set; }
        public float? Umfangmitte { get; set; }
        public float? Umfangoben { get; set; }
        public float? Zungenbreiteoben { get; set; }
        public float? Zungenbreiteunten { get; set; }
        public float? Zungendicke { get; set; }
        public string? Kehleform { get; set; }
        public string? Kehlematerial { get; set; }
        public string? Krueckematerial { get; set; }
        public string? Quellen { get; set; }
        public string? Kommentarzungen { get; set; }

        [JsonIgnore] public virtual Register RegisterNavigation { get; set; } = null!;
    }
}
