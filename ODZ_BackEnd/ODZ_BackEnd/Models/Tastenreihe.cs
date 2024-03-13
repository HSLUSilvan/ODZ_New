using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Tastenreihe
    {
        public Tastenreihe()
        {
            Werks = new HashSet<Werk>();
        }

        public int Id { get; set; }
        public int Massnahme { get; set; }
        public string? Name { get; set; }
        public uint? Position { get; set; }
        public string? Tastenumfang { get; set; }
        public string? Tiefeoktave { get; set; }
        public string? Subsemitonien { get; set; }
        public string? Materialtasten { get; set; }
        public int? Untertastenlaenge { get; set; }
        public int? Vorderteillaenge { get; set; }
        public int? Obertastenlaenge { get; set; }
        public string? Tastenhebel { get; set; }
        public string? Stichmass { get; set; }
        public string? Tastendruck { get; set; }
        public string? Manualeerhalten { get; set; }
        public string? Klaviaturerhalten { get; set; }
        public string? Pedaltyp { get; set; }
        public string? Pedalklaviaturstellung { get; set; }
        public string? Tastenumfangpedal { get; set; }
        public string? Tiefeoktavepedal { get; set; }
        public string? Tastenlaengepedalsichtbar { get; set; }
        public string? Materialpedaltasten { get; set; }
        public string? Pedalerhalten { get; set; }
        public string? Erhalten { get; set; }
        public string? Koppelmanual { get; set; }
        public string? Spieltraktur { get; set; }
        public string? Spieltrakturerhalten { get; set; }
        public string? Registertraktur { get; set; }
        public string? Typusregisterzuege { get; set; }
        public string? Registerbeschriftung { get; set; }
        public string? Registertrakturerhalten { get; set; }
        public int? Anzahltransmissionen { get; set; }
        public int? Anzahlauszuege { get; set; }
        public int? Anzahlverlaengerungen { get; set; }
        public int? Anzahlsammelzuege { get; set; }
        public int? Nebenregister { get; set; }
        public string? Kommentartastenreihe { get; set; }
        public int? Xid { get; set; }

        [JsonIgnore] public virtual Massnahme MassnahmeNavigation { get; set; } = null!;
        public virtual ICollection<Werk> Werks { get; set; }
    }
}
