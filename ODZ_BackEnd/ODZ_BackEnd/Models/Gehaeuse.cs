using System;
using System.Collections.Generic;

namespace ODZ_BackEnd.Models
{
    public partial class Gehaeuse
    {
        public int Id { get; set; }
        public string? Stilgehaeuse { get; set; }
        public int? Datumgehaeuse { get; set; }
        public string? Materialgehaeuse { get; set; }
        public string? Fassunggehaeuse { get; set; }
        public string? Verziehrungengehaeuse { get; set; }
        public string? Prospektregister { get; set; }
        public string? Prospektanzahlpfeifen { get; set; }
        public string? Prospektklingend { get; set; }
        public string? Gehäuseinschriften { get; set; }
        public string? Gehäuseerhalten { get; set; }
        public string? Kommentargehaeuse { get; set; }
        public int? Idorgelvorher { get; set; }
        public int? Idorgelnachher { get; set; }

        public virtual Datum? DatumgehaeuseNavigation { get; set; }
        public virtual Massnahme IdNavigation { get; set; } = null!;
    }
}
