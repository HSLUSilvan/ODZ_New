using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Werk
    {
        public Werk()
        {
            Ladens = new HashSet<Laden>();
        }

        public int Id { get; set; }
        public int Tastenreihe { get; set; }
        public int? Position { get; set; }
        public string? Name { get; set; }
        public string? Werkschwellbar { get; set; }
        public string? Kommentarwerk { get; set; }
        public int? Xid { get; set; }

        [JsonIgnore] public virtual Tastenreihe TastenreiheNavigation { get; set; } = null!;
        public virtual ICollection<Laden> Ladens { get; set; }
    }
}
