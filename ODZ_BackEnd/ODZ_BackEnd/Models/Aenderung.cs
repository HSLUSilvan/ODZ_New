using System;
using System.Collections.Generic;

namespace ODZ_BackEnd.Models
{
    public partial class Aenderung
    {
        public int Id { get; set; }
        public DateOnly? Datum { get; set; }
        public int? Aktion { get; set; }
        public int? Benutzer { get; set; }
        public int? Orgel { get; set; }
        public int? Massnahme { get; set; }
        public int? Kontakt { get; set; }
        public int? Literatur { get; set; }
        public int? Medium { get; set; }

        public virtual Aktion? AktionNavigation { get; set; }
        public virtual Benutzer? BenutzerNavigation { get; set; }
    }
}
