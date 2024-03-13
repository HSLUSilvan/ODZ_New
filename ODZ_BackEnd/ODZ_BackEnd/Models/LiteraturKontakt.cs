using System;
using System.Collections.Generic;

namespace ODZ_BackEnd.Models
{
    public partial class LiteraturKontakt
    {
        public int Literatur { get; set; }
        public int Kontakt { get; set; }
        public string? Seitenangabe { get; set; }

        public virtual Kontakt KontaktNavigation { get; set; } = null!;
        public virtual Literatur LiteraturNavigation { get; set; } = null!;
    }
}
