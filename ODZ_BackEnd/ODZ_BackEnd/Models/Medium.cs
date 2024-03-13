using System;
using System.Drawing;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ODZ_BackEnd.Models
{
    public partial class Medium
    {
        public Medium()
        {
            Kontakts = new HashSet<Kontakt>();
            Massnahmes = new HashSet<Massnahme>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Mediumtyp { get; set; }
        public byte[]? Daten { get; set; }
        [JsonIgnore] public DateOnly? Erfasstam { get; set; }
        public string? Name { get; set; }
        public int? Datum { get; set; }
        public string? Beschreibung { get; set; }

        [JsonIgnore] public virtual Datum? DatumNavigation { get; set; }

        public virtual Mediumtyp? MediumtypNavigation { get; set; } = null!;

        [JsonIgnore] public virtual ICollection<Kontakt> Kontakts { get; set; }
        [InverseProperty(nameof(Massnahme.Media))]
        [JsonIgnore] public virtual ICollection<Massnahme> Massnahmes { get; set; }
    }
}
