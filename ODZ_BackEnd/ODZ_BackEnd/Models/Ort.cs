using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Ort
    {
        public Ort()
        {
            KontaktGeburtsortNavigations = new HashSet<Kontakt>();
            KontaktOrtNavigations = new HashSet<Kontakt>();
            KontaktSterbeortNavigations = new HashSet<Kontakt>();
            Massnahmes = new HashSet<Massnahme>();
            Orgels = new HashSet<Orgel>();
            Kontakts = new HashSet<Kontakt>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Namevariante1 { get; set; }
        public string? Namevariante2 { get; set; }
        public string? Namevariante3 { get; set; }
        public string? Plz { get; set; }
        public int? Kanton { get; set; }
        public int? Land { get; set; }

        public virtual Kanton? KantonNavigation { get; set; }
        public virtual Land? LandNavigation { get; set; }
        [JsonIgnore]  public virtual ICollection<Kontakt> KontaktGeburtsortNavigations { get; set; }
        [JsonIgnore]  public virtual ICollection<Kontakt> KontaktOrtNavigations { get; set; }
        [JsonIgnore]  public virtual ICollection<Kontakt> KontaktSterbeortNavigations { get; set; }
        [JsonIgnore]  public virtual ICollection<Massnahme> Massnahmes { get; set; }
        [JsonIgnore] public virtual ICollection<Orgel> Orgels { get; set; }

        [JsonIgnore] public virtual ICollection<Kontakt> Kontakts { get; set; }
    }
}
