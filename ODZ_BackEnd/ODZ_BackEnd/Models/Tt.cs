using System;
using System.Collections.Generic;

namespace ODZ_BackEnd.Models
{
    public partial class Tt
    {
        public int Id { get; set; }
        public int Mediumtyp { get; set; }
        public byte[]? Daten { get; set; }
        public DateOnly? Erfasstam { get; set; }
        public string? Name { get; set; }
        public int? Datum { get; set; }
        public string? Beschreibung { get; set; }
    }
}
