using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Laden
    {
        public Laden()
        {
            Registers = new HashSet<Register>();
        }

        public int Id { get; set; }
        public int Werk { get; set; }
        public int? Position { get; set; }
        public string? Name { get; set; }
        public string? Ladentypen { get; set; }
        public string? Winddruck { get; set; }
        public string? Tonumfangmanualwerke { get; set; }
        public string? Ladenerhalten { get; set; }
        public string? Dichtungsystemlade { get; set; }
        public string? Ventilordnunglade { get; set; }
        public string? Rasterbrettbeschreibung { get; set; }
        public string? Inschriften { get; set; }
        public string? Kommentarladen { get; set; }
        public string? Tonumfang { get; set; }
        public int? Xid { get; set; }

        [JsonIgnore] public virtual Werk WerkNavigation { get; set; } = null!;
        public virtual ICollection<Register> Registers { get; set; }
    }
}
