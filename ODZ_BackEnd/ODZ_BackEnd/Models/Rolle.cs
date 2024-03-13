using System;
using System.Collections.Generic;

namespace ODZ_BackEnd.Models
{
    public partial class Rolle
    {
        public Rolle()
        {
            Benutzers = new HashSet<Benutzer>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Benutzer> Benutzers { get; set; }
    }
}
