using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ODZ_BackEnd.Models
{
    public partial class Massnahme
    {
        public Massnahme()
        {
            LiteraturMassnahmes = new HashSet<LiteraturMassnahme>();
            Tastenreihes = new HashSet<Tastenreihe>();
            Kontakts = new HashSet<Kontakt>();
            Media = new HashSet<Medium>();
        }

        public int Id { get; set; }
        [JsonIgnore] public int? Orgel { get; set; }
        [JsonIgnore] public int? Ort { get; set; }
        public string? Massnahme1 { get; set; }
        [JsonIgnore] public int? Massnahmedatum { get; set; }
        [JsonIgnore] public string? Massnahmeopusnummer { get; set; }
        [JsonIgnore] public string? Massnahmekostenofferte { get; set; }
        [JsonIgnore] public string? Massnahmekosteneffektiv { get; set; }
        public int? Anzahlmanuale { get; set; }
        [JsonIgnore] public int? Anzahlmanualwerke { get; set; }
        [JsonIgnore] public string? Koppelmanual { get; set; }
        [JsonIgnore] public int? Anzahlgeplantermanuale { get; set; }
        [JsonIgnore] public int? Anzahlregister { get; set; }
        [JsonIgnore] public int? Anzahlpfeifenreihen { get; set; }
        [JsonIgnore] public int? Anzahlfreierregisterpositionen { get; set; }
        [JsonIgnore] public int? Anzahltransmissionen { get; set; }
        public string? Balganlage { get; set; }
        public string? Winderzeugung { get; set; }
        public string? Temperierung { get; set; }
        public string? Stimmtonhoehe { get; set; }
        public string? Spieltischspielschrank { get; set; }
        public string? Spielhilfen { get; set; }
        public string? Nebenregister { get; set; }
        public string? Intonation { get; set; }
        public string? Klang { get; set; }
        public string? Unterhalt { get; set; }
        public string? Kommentar { get; set; }
        public string? Quellen { get; set; }
        public string? Historischekomponenten { get; set; }
        public string? Textdisposition { get; set; }
        public int? Benutzer { get; set; }
        public int? Istsichtbar { get; set; }
        public int? BassRegister { get; set; }
        public int? DiskantRegister { get; set; }
        public int? Anzahlauszuege { get; set; }
        public int? Anzahlverlaengerungen { get; set; }
        public int? Anzahlsammelzuege { get; set; }
        public uint? AnzahlPfeiffen { get; set; }
        public string? InschriftenFimenschild { get; set; }
        public string? Positionspieltisch { get; set; }
        public string? Spieltischerhalten { get; set; }
        public int? Anzahlpedal { get; set; }
        public string? Positionbalganlage { get; set; }
        public string? Balganlageerhalten { get; set; }
        public string? Balganlagetext { get; set; }
        public string? TexttemperierungStimmton { get; set; }

        public virtual Benutzer? BenutzerNavigation { get; set; }
        public virtual Datum? MassnahmedatumNavigation { get; set; }
        public virtual Orgel? OrgelNavigation { get; set; }
        public virtual Ort? OrtNavigation { get; set; }
        public virtual Gehaeuse Gehaeuse { get; set; } = null!;
        public virtual ICollection<LiteraturMassnahme> LiteraturMassnahmes { get; set; }
        public virtual ICollection<Tastenreihe> Tastenreihes { get; set; }

        public virtual ICollection<Kontakt> Kontakts { get; set; }
        public virtual ICollection<Medium> Media { get; set; }

    }
}
