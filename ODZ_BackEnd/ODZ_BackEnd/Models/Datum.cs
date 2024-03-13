using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Datum
    {
        public Datum()
        {
            Gehaeuses = new HashSet<Gehaeuse>();
            KontaktAufloesungsdatumNavigations = new HashSet<Kontakt>();
            KontaktBeerdigungsdatumNavigations = new HashSet<Kontakt>();
            KontaktGeburtsdatumNavigations = new HashSet<Kontakt>();
            KontaktGruendungsdatumNavigations = new HashSet<Kontakt>();
            KontaktSterbedatumNavigations = new HashSet<Kontakt>();
            KontaktTaufdatumNavigations = new HashSet<Kontakt>();
            Massnahmes = new HashSet<Massnahme>();
            Media = new HashSet<Medium>();
            OrgelDatumbaugebaudeNavigations = new HashSet<Orgel>();
            OrgelNeubaudatumNavigations = new HashSet<Orgel>();
        }

        public int Id { get; set; }
        [property: JsonConverter(typeof(DateOnlyConverter))] public DateOnly Datum1 { get; set; }
        public string? Bezeichnung { get; set; }
        public string? Pape { get; set; }
        [property: JsonConverter(typeof(DateOnlyConverter))] public DateOnly? Bis { get; set; }

        [JsonIgnore] public virtual ICollection<Gehaeuse> Gehaeuses { get; set; }
        [JsonIgnore] public virtual ICollection<Kontakt> KontaktAufloesungsdatumNavigations { get; set; }
        [JsonIgnore] public virtual ICollection<Kontakt> KontaktBeerdigungsdatumNavigations { get; set; }
        [JsonIgnore] public virtual ICollection<Kontakt> KontaktGeburtsdatumNavigations { get; set; }
        [JsonIgnore] public virtual ICollection<Kontakt> KontaktGruendungsdatumNavigations { get; set; }
        [JsonIgnore] public virtual ICollection<Kontakt> KontaktSterbedatumNavigations { get; set; }
        [JsonIgnore] public virtual ICollection<Kontakt> KontaktTaufdatumNavigations { get; set; }
        [JsonIgnore] public virtual ICollection<Massnahme> Massnahmes { get; set; }
        [JsonIgnore] public virtual ICollection<Medium> Media { get; set; }
        [JsonIgnore] public virtual ICollection<Orgel> OrgelDatumbaugebaudeNavigations { get; set; }
        [JsonIgnore] public virtual ICollection<Orgel> OrgelNeubaudatumNavigations { get; set; }
    }
}
