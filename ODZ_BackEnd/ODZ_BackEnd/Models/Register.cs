using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Register
    {
        public Register()
        {
            Labiales = new HashSet<Labiale>();
            Mixturkornettes = new HashSet<Mixturkornette>();
            Zungens = new HashSet<Zungen>();
        }

        public int Id { get; set; }
        public int Laden { get; set; }
        public int? Position { get; set; }
        public string? Name { get; set; }
        public string? Tonhoehe { get; set; }
        public string? Kommentar { get; set; }
        public int? Positionlade { get; set; }
        public string? Material { get; set; }
        public string? Registererhalten { get; set; }
        public int? Idorgelvorher { get; set; }
        public int? Idorgelnachher { get; set; }
        public int? Xid { get; set; }

        [JsonIgnore] public virtual Laden LadenNavigation { get; set; } = null!;
        public virtual ICollection<Labiale> Labiales { get; set; }
        public virtual ICollection<Mixturkornette> Mixturkornettes { get; set; }
        public virtual ICollection<Zungen> Zungens { get; set; }
    }
}
