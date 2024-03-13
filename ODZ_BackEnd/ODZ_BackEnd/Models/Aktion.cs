using System;
using System.Collections.Generic;

namespace ODZ_BackEnd.Models
{
    public partial class Aktion
    {
        public Aktion()
        {
            Aenderungs = new HashSet<Aenderung>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Aenderung> Aenderungs { get; set; }
    }
}
