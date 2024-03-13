using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Mediumtyp
    {
        public Mediumtyp()
        {
            Media = new HashSet<Medium>();
        }

        public int Id { get; set; }
        public string? Dateiendung { get; set; }
        public string Name { get; set; } = null!;

        [JsonIgnore] public virtual ICollection<Medium> Media { get; set; }
    }
}
