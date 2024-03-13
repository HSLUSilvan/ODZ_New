using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Kanton
    {
        public Kanton()
        {
            Orts = new HashSet<Ort>();
        }

        [JsonIgnore] public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Namekurz { get; set; }

        [JsonIgnore] public virtual ICollection<Ort> Orts { get; set; }
    }
}
