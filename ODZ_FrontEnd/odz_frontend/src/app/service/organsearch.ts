import { Kontakt, Massnahme } from "../api/Api";

export interface OrganSearch {
    plz: string | null;
    name: string | null;
    kantonName: string | null;
    bezeichnung: number | null;
    orgelbezeichnung: string | null;
    datum: Date | null;
    gebaeude: string | null;
    kontakts: string[] | null;
    massnahme1: string | null;
    id: number | null;
  }

  export class OrgelModel {
  id!: number;
  orgelnummer!: string;
  bezeichnung!: string;
  neubaudatum!: number
  istsichbar!: number;
  ort!: number;
  gemeinde!: string;
  ortsteil!: string;
  adresse!: string;
  gebaeude!: string;
  gebaeudeteil!: string;
  pfarre!: string;
  konfession!: string;
  datumbaugebaude!: number;
  eigentuemer!: string;
  orgelerhalten!: string;
  latitude!: string;
  longitude!: string;
  idorgelvorher!: number;
  }

  export class OrtModel {
  id?: number;
  name?: string | null;
  namevariante1?: string | null;
  namevariante2?: string | null;
  namevariante3?: string | null;
  plz?: string | null;
  kanton?: number | null;
  land?: number | null;
  }

  export class KontaktModel {
  id?: number;
  typ?: number | null;
  ort?: number | null;
  adresse?: string | null;
  kommentar?: string | null;
  benutzer?: number | null;
  quelle?: string | null;
  istorgelexperte?: number | null;
  istorgelbauer?: number | null;
  isturheber?: number | null;
  name?: string | null;
  vorname?: string | null;
  synonyme?: string | null;
  geburtsdatum?: number | null;
  geburtsort?: number | null;
  taufdatum?: number | null;
  namemutter?: string | null;
  namevater?: string | null;
  sterbedatum?: number | null;
  sterbeort?: number | null;
  beerdigungsdatum?: number | null;
  generation?: string | null;
  name1?: string | null;
  name2?: string | null;
  firmentyp?: string | null;
  vorgaenger?: string | null;
  gruendungsdatum?: number | null;
  aufloesungsdatum?: number | null;
  nachfolger?: string | null;
  pBez?: string | null;
  xid?: number | null;
  istsichbar?: number | null;
    }

    export class TastenreiheModel {
      id?: number;
      massnahme?: number;
      name?: string | null;
      position?: number | null;
      tastenumfang?: string | null;
      tiefeoktave?: string | null;
      subsemitonien?: string | null;
      materialtasten?: string | null;
      untertastenlaenge?: number | null;
      vorderteillaenge?: number | null;
      obertastenlaenge?: number | null;
      tastenhebel?: string | null;
      stichmass?: string | null;
      tastendruck?: string | null;
      manualeerhalten?: string | null;
      klaviaturerhalten?: string | null;
      pedaltyp?: string | null;
      pedalklaviaturstellung?: string | null;
      tastenumfangpedal?: string | null;
      tiefeoktavepedal?: string | null;
      tastenlaengepedalsichtbar?: string | null;
      materialpedaltasten?: string | null;
      pedalerhalten?: string | null;
      erhalten?: string | null;
      koppelmanual?: string | null;
      spieltraktur?: string | null;
      spieltrakturerhalten?: string | null;
      registertraktur?: string | null;
      typusregisterzuege?: string | null;
      registerbeschriftung?: string | null;
      registertrakturerhalten?: string | null;
      anzahltransmissionen?: number | null;
      anzahlauszuege?: number | null;
      anzahlverlaengerungen?: number | null;
      anzahlsammelzuege?: number | null;
      nebenregister?: number | null;
      kommentartastenreihe?: string | null;
      xid?: number | null;
      MassnahmeNavigation?: Massnahme[] | null;
    }

    export class WerkModel {
      id?: number;
      tastenreihe?: number;
      position?: number | null;
      name?: string | null;
      werkschwellbar?: string | null;
      kommentarwerk?: string | null;
      xid?: number | null;
    }

    export class LadenModel {
      id?: number;
      werk?: number;
      position?: number | null;
      name?: string | null;
      ladentypen?: string | null;
      winddruck?: string | null;
      tonumfangmanualwerke?: string | null;
      ladenerhalten?: string | null;
      dichtungsystemlade?: string | null;
      ventilordnunglade?: string | null;
      rasterbrettbeschreibung?: string | null;
      inschriften?: string | null;
      kommentarladen?: string | null;
      tonumfang?: string | null;
      xid?: number | null;
    }

    export class RegisterModel {
  id?: number;
  laden?: number;
  position?: number | null;
  name?: string | null;
  tonhoehe?: string | null;
  kommentar?: string | null;
  positionlade?: number | null;
  material?: string | null;
  registererhalten?: string | null;
  idorgelvorher?: number | null;
  idorgelnachher?: number | null;
  xid?: number | null;
}

export class MediumModel {
  mediumtyp?: number;
  daten?: string | null;
  name?: string | null;
  datum?: number | null;
  beschreibung?: string | null;
  }
    