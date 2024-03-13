using System;
using System.Collections.Generic;

namespace ODZ_BackEnd.Models
{
    public partial class Kontakttyp
    {
        public Kontakttyp()
        {
            Kontakts = new HashSet<Kontakt>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Kontakt> Kontakts { get; set; }
    }
}
