import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';
import { Api, Massnahme, Orgel, Tastenreihe } from '../api/Api';
import { OrganService } from '../service/organ.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { KontaktModel, LadenModel, MediumModel, OrgelModel, RegisterModel, TastenreiheModel, WerkModel } from '../service/organsearch';
import { HttpClient } from '@angular/common/http';
import { DateDialog, DateDialogData } from '../dialog/dialog.component';
import { PlaceDialog } from '../dialogOrt/dialogOrt.component';
import { UserDialog } from '../dialogBenutzer/dialogBenutzer.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [ './edit.component.scss' ]
})

export class EditComponent implements OnInit {

  organ: Orgel[]| any;
  massnahme: Massnahme[]| any;
  tastenreihe: Tastenreihe[]| any;
  valid: any = {};
  public orgelData = new OrgelModel();
  public orgelForm !: FormGroup;
  public kontaktData = new KontaktModel();
  public kontaktForm !: FormGroup;
  public tastenreihenData = new TastenreiheModel();
  public tastenreihenForm !: FormGroup;
  public tastenreiheSelect !: any;
  public werkData = new WerkModel();
  public werkForm !: FormGroup;
  public ladenData = new LadenModel();
  public ladenForm !: FormGroup;
  public registerData = new RegisterModel();
  public registerForm !: FormGroup;
  public mediaData = new MediumModel();
  public mediaForm !: FormGroup;
  dateDataSource: DateDialogData[]| any;
  id: number = 4888;
  panelOpenState = false;
  theFile: any = null;
  mediaName: string;
  mediaDatum: number;
  mediaBeschreibung: string;
messages: string[] = [];
uploadLog: string;
  
  public model = {name: ""}
  selectedId: any;

  constructor(
    private organService: OrganService, 
    private route: ActivatedRoute,
    private router: Router,
    private fb : FormBuilder,
    private http : HttpClient,
    public dialog: MatDialog) { }

  ngOnInit() {
  this.orgelForm = this.fb.group({
    orgelid: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),
    orgelnummer:"",
    bezeichnung:"",
    neubaudatum: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),
    istsichbar:new FormControl("", [
      Validators.required,
      Validators.pattern("^[0,1]*$"),
      Validators.maxLength(1),
    ]),
    ort:new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),
    gemeinde:"",
    ortsteil:"",
    adresse:"",
    gebäude:"",
    gebäudeteil:"",
    pfarre:"",
    konfession:"",
    datumgebäude:new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),
    eigentümer:"",
    orgelerhalten:"",
    latitude:"",
    longitude:"",
    idorgelvorher:"",
  }) 
  this.kontaktForm = this.fb.group({
  id: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  typ: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  ort: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  adresse: "",
  kommentar: "",
  benutzer: "",
  quelle: "",
  istorgelexperte: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0,1]*$"),
    Validators.maxLength(1),
  ]),
  istorgelbauer: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0,1]*$"),
    Validators.maxLength(1),
  ]),
  isturheber: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0,1]*$"),
    Validators.maxLength(1),
  ]),
  name: "",
  vorname: "",
  synonyme: "",
  geburtsdatum: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  geburtsort: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  taufdatum: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  namemutter: "",
  namevater: "",
  sterbedatum: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  sterbeort: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  beerdigungsdatum: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  generation: "",
  name1: "",
  name2: "",
  firmentyp: "",
  vorgaenger: "",
  gruendungsdatum: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  aufloesungsdatum: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]),
  nachfolger: "",
  pBez: "",
  xid: "",
  istsichbar: new FormControl("", [
    Validators.required,
    Validators.pattern("^[0,1]*$"),
    Validators.maxLength(1),
  ]),
  })
  this.tastenreihenForm = this.fb.group({
    id: "",
    massnahme: "",
    name: "",
    position: "",
    tastenumfang: "",
    tiefeoktave: "",
    subsemitonien: "",
    materialtasten: "",
    untertastenlaenge: "",
    vorderteillaenge: "",
    obertastenlaenge: "",
    tastenhebel: "",
    stichmass: "",
    tastendruck: "",
    manualeerhalten: "",
    klaviaturerhalten: "",
    pedaltyp: "",
    pedalklaviaturstellung: "",
    tastenumfangpedal: "",
    tiefeoktavepedal: "",
    tastenlaengepedalsichtbar: "",
    materialpedaltasten: "",
    pedalerhalten: "",
    erhalten: "",
    koppelmanual: "",
    spieltraktur: "",
    spieltrakturerhalten: "",
    registertraktur: "",
    typusregisterzuege: "",
    registerbeschriftung: "",
    registertrakturerhalten: "",
    anzahltransmissionen: "",
    anzahlauszuege: "",
    anzahlverlaengerungen: "",
    anzahlsammelzuege: "",
    nebenregister: "",
    kommentartastenreihe: "",
    xid: "",
  })
  this.werkForm = this.fb.group({
    id: "",
    tastenreihe: "",
    position: "",
    name: "",
    werkschwellbar: "",
    kommentarwerk: "",
    xid: "",
  })
  this.ladenForm = this.fb.group({
    id: "",
    werk: "",
    position: "",
    name: "",
    ladentypen: "",
    winddruck: "",
    tonumfangmanualwerke: "",
    ladenerhalten: "",
    dichtungsystemlade: "",
    ventilordnunglade: "",
    rasterbrettbeschreibung: "",
    inschriften: "",
    kommentarladen: "",
    tonumfang: "",
    xid: "",
  })
  this.registerForm = this.fb.group({
    id: "",
    laden: "",
    position: "",
    name: "",
    tonhoehe: "",
    kommentar: "",
    positionlade: "",
    material: "",
    registererhalten: "",
    idorgelvorher: "",
    idorgelnachher: "",
    xid: "",
  })
  this.mediaForm = this.fb.group({
    mediumtyp: "",
    daten: "",
    name: "",
    datum: "",
    beschreibung: "",
  })
  this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        this.getEdit(this.id);
      }
    );
}
  getEdit(id : number): void {
    this.organService.getOrgan(id)
      .subscribe(massnahme => {
        this.massnahme = massnahme;
        this.populateOrgelForm();
        this.populateKontaktForm();
        this.populateTastenreihenForm();
        this.populateWerkForm();
        this.populateLadenForm();
        this.populateRegisterForm();
      })
    }  

  onSearch(orgelId: any): void {
    this.id = orgelId;
    this.getEdit(this.id)
  }

  addOrgelRow() {   
    this.organService.addOrgan(this.orgelData)
    .subscribe((res) => {     
    });
  }

  updateOrgelRow() {   
    this.organService.updateOrgan(this.orgelData)
    .subscribe((res) => {     
    });
  }

  addKontaktRow() {   
    this.organService.addKontakt(this.kontaktData)
    .subscribe((res) => {     
    });
  }

  updateKontaktRow() {   
    this.organService.updateKontakt(this.kontaktData)
    .subscribe((res) => {     
    });
  }

  addTastenreihenRow() {   
    this.organService.addTastenreihe(this.tastenreihenData)
    .subscribe((res) => {     
    });
  }

  updateTastenreihenRow() {   
    this.organService.updateTastenreihe(this.tastenreihenData)
    .subscribe((res) => {     
    });
  }

  addWerkRow() {   
    this.organService.addWerk(this.werkData)
    .subscribe((res) => {     
    });
  }

  updateWerkRow() {   
    this.organService.updateWerk(this.werkData)
    .subscribe((res) => {     
    });
  }

  addLadenRow() {   
    this.organService.addLaden(this.ladenData)
    .subscribe((res) => {     
    });
  }

  updateLadenRow() {   
    this.organService.updateLaden(this.ladenData)
    .subscribe((res) => {     
    });
  }

  addRegisterRow() {   
    this.organService.addRegister(this.registerData)
    .subscribe((res) => {     
    });
  }

  updateRegisterRow() {   
    this.organService.updateRegister(this.registerData)
    .subscribe((res) => {     
    });
  }

  addMediaRow() {   
    this.organService.addMedia(this.mediaData)
    .subscribe((res) => {     
    });
  }

  saveOrgel() {
    this.populateOrgelData();
    this.populateKontaktData();
    this.populateTastenreihenData()
    this.populateWerkData();
    this.populateLadenData();
    this.populateRegisterData()
    this.updateOrgelRow();
    this.updateKontaktRow();
    this.updateTastenreihenRow();
    this.updateWerkRow();
    this.updateLadenRow();
    this.updateRegisterRow()
  }

  saveNewOrgel() {
    this.populateOrgelData();
    this.populateKontaktData();
    this.populateTastenreihenData();
    this.populateWerkData();
    this.populateLadenData();
    this.populateRegisterData()
    this.addOrgelRow();
    this.addKontaktRow();
    this.addTastenreihenRow();
    this.addWerkRow();
    this.addLadenRow();
    this.addRegisterRow()
  }

  populateOrgelForm() {
    this.orgelForm.setValue({
    orgelid: this.massnahme.orgelNavigation.id,
    orgelnummer: this.massnahme.orgelNavigation.orgelnummer,
    bezeichnung: this.massnahme.orgelNavigation.bezeichnung,
    neubaudatum: this.massnahme.orgelNavigation.neubaudatum,
    istsichbar: this.massnahme.orgelNavigation.istsichbar,
    ort: this.massnahme.orgelNavigation.ort,
    gemeinde: this.massnahme.orgelNavigation.gemeinde,
    ortsteil: this.massnahme.orgelNavigation.ortsteil,
    adresse: this.massnahme.orgelNavigation.adresse,
    gebäude: this.massnahme.orgelNavigation.gebaeude,
    gebäudeteil: this.massnahme.orgelNavigation.gebaeudeteil,
    pfarre: this.massnahme.orgelNavigation.pfarre,
    konfession: this.massnahme.orgelNavigation.konfession,
    datumgebäude:this.massnahme.orgelNavigation.datumbaugebaude,
    eigentümer: this.massnahme.orgelNavigation.eigentuemer,
    orgelerhalten: this.massnahme.orgelNavigation.orgelerhalten,
    latitude: this.massnahme.orgelNavigation.latitude,
    longitude: this.massnahme.orgelNavigation.longitude,
    idorgelvorher: this.massnahme.orgelNavigation.idorgelvorher
    });
  }

  populateOrgelData() {
    this.orgelData.id = this.orgelForm.value.orgelid;
    this.orgelData.orgelnummer = this.orgelForm.value.orgelnummer;
    this.orgelData.bezeichnung = this.orgelForm.value.bezeichnung;
    this.orgelData.adresse = this.orgelForm.value.adresse;
    this.orgelData.gebaeude = this.orgelForm.value.gebäude;
    this.orgelData.gebaeudeteil = this.orgelForm.value.gebäudeteil;
    this.orgelData.neubaudatum =  this.orgelForm.value.neubaudatum;
    this.orgelData.istsichbar =  this.orgelForm.value.istsichbar;
    this.orgelData.ort =  this.orgelForm.value.ort;
    this.orgelData.gemeinde =  this.orgelForm.value.gemeinde;
    this.orgelData.ortsteil =  this.orgelForm.value.ortsteil;
    this.orgelData.pfarre =  this.orgelForm.value.pfarre;
    this.orgelData.konfession =  this.orgelForm.value.konfession;
    this.orgelData.datumbaugebaude =  this.orgelForm.value.datumgebäude;
    this.orgelData.eigentuemer =  this.orgelForm.value.eigentümer;
    this.orgelData.orgelerhalten =  this.orgelForm.value.orgelerhalten;
    this.orgelData.latitude =  this.orgelForm.value.latitude;
    this.orgelData.longitude =  this.orgelForm.value.longitude;
    this.orgelData.idorgelvorher =  this.orgelForm.value.idorgelvorher
  }

  populateKontaktForm() {
    this.kontaktForm.setValue({
      id: this.massnahme.kontakts[0].id,
      typ: this.massnahme.kontakts[0].typ,
      ort: this.massnahme.kontakts[0].ort,
      adresse: this.massnahme.kontakts[0].adresse,
      kommentar: this.massnahme.kontakts[0].kommentar,
      benutzer: this.massnahme.kontakts[0].benutzer,
      quelle: this.massnahme.kontakts[0].quelle,
      istorgelexperte: this.massnahme.kontakts[0].istorgelexperte,
      istorgelbauer: this.massnahme.kontakts[0].istorgelbauer,
      isturheber: this.massnahme.kontakts[0].isturheber,
      name: this.massnahme.kontakts[0].name,
      vorname: this.massnahme.kontakts[0].vorname,
      synonyme: this.massnahme.kontakts[0].synonyme,
      geburtsdatum: this.massnahme.kontakts[0].geburtsdatum,
      geburtsort: this.massnahme.kontakts[0].geburtsort,
      taufdatum: this.massnahme.kontakts[0].taufdatum,
      namemutter: this.massnahme.kontakts[0].namemutter,
      namevater: this.massnahme.kontakts[0].namevater,
      sterbedatum: this.massnahme.kontakts[0].sterbedatum,
      sterbeort: this.massnahme.kontakts[0].sterbeort,
      beerdigungsdatum: this.massnahme.kontakts[0].beerdigungsdatum,
      generation: this.massnahme.kontakts[0].generation,
      name1: this.massnahme.kontakts[0].name1,
      name2: this.massnahme.kontakts[0].name2,
      firmentyp: this.massnahme.kontakts[0].firmentyp,
      vorgaenger: this.massnahme.kontakts[0].vorgaenger,
      gruendungsdatum: this.massnahme.kontakts[0].gruendungsdatum,
      aufloesungsdatum: this.massnahme.kontakts[0].aufloesungsdatum,
      nachfolger: this.massnahme.kontakts[0].nachfolger,
      pBez: this.massnahme.kontakts[0].pBez,
      xid: this.massnahme.kontakts[0].xid,
      istsichbar: this.massnahme.kontakts[0].istsichbar,
    });
  }

  populateKontaktData() {
    this.kontaktData.id = this.kontaktForm.value.id;
    this.kontaktData.typ = this.kontaktForm.value.typ;
    this.kontaktData.ort = this.kontaktForm.value.ort;
    this.kontaktData.adresse = this.kontaktForm.value.adresse;
    this.kontaktData.kommentar = this.kontaktForm.value.kommentar;
    this.kontaktData.benutzer = this.kontaktForm.value.benutzer;
    this.kontaktData.quelle =  this.kontaktForm.value.quelle;
    this.kontaktData.istorgelexperte =  this.kontaktForm.value.istorgelexperte;
    this.kontaktData.istorgelbauer =  this.kontaktForm.value.istorgelbauer;
    this.kontaktData.isturheber =  this.kontaktForm.value.isturheber;
    this.kontaktData.name =  this.kontaktForm.value.name;
    this.kontaktData.vorname =  this.kontaktForm.value.vorname;
    this.kontaktData.synonyme =  this.kontaktForm.value.synonyme;
    this.kontaktData.geburtsdatum =  this.kontaktForm.value.geburtsdatum;
    this.kontaktData.geburtsort =  this.kontaktForm.value.geburtsort;
    this.kontaktData.taufdatum =  this.kontaktForm.value.taufdatum;
    this.kontaktData.namemutter =  this.kontaktForm.value.namemutter;
    this.kontaktData.namevater =  this.kontaktForm.value.namevater;
    this.kontaktData.sterbedatum =  this.kontaktForm.value.sterbedatum;
    this.kontaktData.sterbeort = this.kontaktForm.value.sterbeort;
    this.kontaktData.beerdigungsdatum =  this.kontaktForm.value.beerdigungsdatum;
    this.kontaktData.generation =  this.kontaktForm.value.generation;
    this.kontaktData.name1 =  this.kontaktForm.value.name1;
    this.kontaktData.name2 =  this.kontaktForm.value.name2;
    this.kontaktData.firmentyp=  this.kontaktForm.value.firmen;
    this.kontaktData.vorgaenger =  this.kontaktForm.value.vorgaenger;
    this.kontaktData.gruendungsdatum =  this.kontaktForm.value.gruendungsdatum;
    this.kontaktData.aufloesungsdatum =  this.kontaktForm.value.aufloesungsdatum;
    this.kontaktData.nachfolger =  this.kontaktForm.value.nachfolger;
    this.kontaktData.pBez =  this.kontaktForm.value.pBez;
    this.kontaktData.xid =  this.kontaktForm.value.xid;
    this.kontaktData.istsichbar =  this.kontaktForm.value.istsichbar;
  }

  populateTastenreihenForm() {
    this.tastenreihenForm.setValue({
      id: this.massnahme.tastenreihes[0].id,
      massnahme: this.massnahme.tastenreihes[0].massnahme,
      name: this.massnahme.tastenreihes[0].name,
      position: this.massnahme.tastenreihes[0].position,
      tastenumfang: this.massnahme.tastenreihes[0].tastenumfang,
      tiefeoktave: this.massnahme.tastenreihes[0].tiefeoktave,
      subsemitonien: this.massnahme.tastenreihes[0].subsemitonien,
      materialtasten: this.massnahme.tastenreihes[0].materialtasten,
      untertastenlaenge: this.massnahme.tastenreihes[0].untertastenlaenge,
      vorderteillaenge: this.massnahme.tastenreihes[0].vorderteillaenge,
      obertastenlaenge: this.massnahme.tastenreihes[0].obertastenlaenge,
      tastenhebel: this.massnahme.tastenreihes[0].tastenhebel,
      stichmass: this.massnahme.tastenreihes[0].stichmass,
      tastendruck: this.massnahme.tastenreihes[0].tastendruck,
      manualeerhalten: this.massnahme.tastenreihes[0].manualeerhalten,
      klaviaturerhalten: this.massnahme.tastenreihes[0].klaviaturerhalten,
      pedaltyp: this.massnahme.tastenreihes[0].pedaltyp,
      pedalklaviaturstellung: this.massnahme.tastenreihes[0].pedalklaviaturstellung,
      tastenumfangpedal: this.massnahme.tastenreihes[0].tastenumfangpedal,
      tiefeoktavepedal: this.massnahme.tastenreihes[0].tiefeoktavepedal,
      tastenlaengepedalsichtbar: this.massnahme.tastenreihes[0].tastenlaengepedalsichtbar,
      materialpedaltasten: this.massnahme.tastenreihes[0].materialpedaltasten,
      pedalerhalten: this.massnahme.tastenreihes[0].pedalerhalten,
      erhalten: this.massnahme.tastenreihes[0].erhalten,
      koppelmanual: this.massnahme.tastenreihes[0].koppelmanual,
      spieltraktur: this.massnahme.tastenreihes[0].spieltraktur,
      spieltrakturerhalten: this.massnahme.tastenreihes[0].spieltrakturerhalten,
      registertraktur: this.massnahme.tastenreihes[0].registertraktur,
      typusregisterzuege: this.massnahme.tastenreihes[0].typusregisterzuege,
      registerbeschriftung: this.massnahme.tastenreihes[0].registerbeschriftung,
      registertrakturerhalten: this.massnahme.tastenreihes[0].registertrakturerhalten,
      anzahltransmissionen: this.massnahme.tastenreihes[0].anzahltransmissionen,
      anzahlauszuege: this.massnahme.tastenreihes[0].anzahlauszuege,
      anzahlverlaengerungen: this.massnahme.tastenreihes[0].anzahlverlaengerungen,
      anzahlsammelzuege: this.massnahme.tastenreihes[0].anzahlsammelzuege,
      nebenregister: this.massnahme.tastenreihes[0].nebenregister,
      kommentartastenreihe: this.massnahme.tastenreihes[0].kommentartastenreihe,
      xid: this.massnahme.tastenreihes[0].xid,
    });
  }

  populateTastenreihenData() {
    this.tastenreihenData.id = this.tastenreihenForm.value.id;
    this.tastenreihenData.massnahme = this.tastenreihenForm.value.massnahme;
    this.tastenreihenData.name = this.tastenreihenForm.value.name;
    this.tastenreihenData.position = this.tastenreihenForm.value.position;
    this.tastenreihenData.tastenumfang = this.tastenreihenForm.value.tastenumfang;
    this.tastenreihenData.tiefeoktave = this.tastenreihenForm.value.tiefeoktave;
    this.tastenreihenData.subsemitonien =  this.tastenreihenForm.value.subsemitonien;
    this.tastenreihenData.materialtasten =  this.tastenreihenForm.value.materialtasten;
    this.tastenreihenData.untertastenlaenge =  this.tastenreihenForm.value.untertastenlaenge;
    this.tastenreihenData.vorderteillaenge =  this.tastenreihenForm.value.vorderteillaenge;
    this.tastenreihenData.obertastenlaenge =  this.tastenreihenForm.value.obertastenlaenge;
    this.tastenreihenData.tastenhebel =  this.tastenreihenForm.value.tastenhebel;
    this.tastenreihenData.stichmass =  this.tastenreihenForm.value.stichmass;
    this.tastenreihenData.tastendruck =  this.tastenreihenForm.value.tastendruck;
    this.tastenreihenData.manualeerhalten =  this.tastenreihenForm.value.manualeerhalten;
    this.tastenreihenData.klaviaturerhalten =  this.tastenreihenForm.value.klaviaturerhalten;
    this.tastenreihenData.pedaltyp =  this.tastenreihenForm.value.pedaltyp;
    this.tastenreihenData.pedalklaviaturstellung =  this.tastenreihenForm.value.pedalklaviaturstellung;
    this.tastenreihenData.tastenumfangpedal =  this.tastenreihenForm.value.tastenumfangpedal;
    this.tastenreihenData.tiefeoktavepedal = this.tastenreihenForm.value.tiefeoktavepedal;
    this.tastenreihenData.tastenlaengepedalsichtbar =  this.tastenreihenForm.value.tastenlaengepedalsichtbar;
    this.tastenreihenData.materialpedaltasten =  this.tastenreihenForm.value.materialpedaltasten;
    this.tastenreihenData.pedalerhalten =  this.tastenreihenForm.value.pedalerhalten;
    this.tastenreihenData.erhalten =  this.tastenreihenForm.value.erhalten;
    this.tastenreihenData.koppelmanual=  this.tastenreihenForm.value.koppelmanual;
    this.tastenreihenData.spieltraktur =  this.tastenreihenForm.value.spieltraktur;
    this.tastenreihenData.spieltrakturerhalten =  this.tastenreihenForm.value.spieltrakturerhalten;
    this.tastenreihenData.registertraktur =  this.tastenreihenForm.value.registertraktur;
    this.tastenreihenData.typusregisterzuege =  this.tastenreihenForm.value.typusregisterzuege;
    this.tastenreihenData.registerbeschriftung =  this.tastenreihenForm.value.registerbeschriftung;
    this.tastenreihenData.registertrakturerhalten =  this.tastenreihenForm.value.registertrakturerhalten;
    this.tastenreihenData.anzahltransmissionen =  this.tastenreihenForm.value.anzahltransmissionen;
    this.tastenreihenData.anzahlauszuege =  this.tastenreihenForm.value.anzahlauszuege;
    this.tastenreihenData.anzahlverlaengerungen =  this.tastenreihenForm.value.anzahlverlaengerungen;
    this.tastenreihenData.anzahlsammelzuege =  this.tastenreihenForm.value.anzahlsammelzuege;
    this.tastenreihenData.nebenregister =  this.tastenreihenForm.value.nebenregister;
    this.tastenreihenData.kommentartastenreihe =  this.tastenreihenForm.value.kommentartastenreihe;
    this.tastenreihenData.xid =  this.tastenreihenForm.value.xid;
    this.tastenreihenData.MassnahmeNavigation = this.massnahme;
  }

  populateWerkForm() {
    this.werkForm.setValue({
      id: this.massnahme.tastenreihes[0].werks[0].id,
      tastenreihe: this.massnahme.tastenreihes[0].werks[0].tastenreihe,
      position: this.massnahme.tastenreihes[0].werks[0].position,
      name: this.massnahme.tastenreihes[0].werks[0].name,
      werkschwellbar: this.massnahme.tastenreihes[0].werks[0].werkschwellbar,
      kommentarwerk: this.massnahme.tastenreihes[0].werks[0].kommentarwerk,
      xid: this.massnahme.tastenreihes[0].werks[0].xid,
    });
  }

  populateWerkData() {
      this.werkData.id = this.werkForm.value.id;
      this.werkData.tastenreihe = this.werkForm.value.tastenreihe;
      this.werkData.position = this.werkForm.value.position;
      this.werkData.name = this.werkForm.value.name;
      this.werkData.werkschwellbar = this.werkForm.value.werkschwellbar;
      this.werkData.kommentarwerk = this.werkForm.value.kommentarwerk;
      this.werkData.xid = this.werkForm.value.xid;
  }

  populateLadenForm() {
    this.ladenForm.setValue({
      id: this.massnahme.tastenreihes[0].werks[0].ladens[0].id,
      werk: this.massnahme.tastenreihes[0].werks[0].ladens[0].werk,
      position: this.massnahme.tastenreihes[0].werks[0].ladens[0].position,
      name: this.massnahme.tastenreihes[0].werks[0].ladens[0].name,
      ladentypen: this.massnahme.tastenreihes[0].werks[0].ladens[0].ladentypen,
      tonumfangmanualwerke: this.massnahme.tastenreihes[0].werks[0].ladens[0].tonumfangmanualwerke,
      winddruck: this.massnahme.tastenreihes[0].werks[0].ladens[0].ladenerhalten,
      ladenerhalten: this.massnahme.tastenreihes[0].werks[0].ladens[0].id,
      dichtungsystemlade: this.massnahme.tastenreihes[0].werks[0].ladens[0].dichtungsystemlade,
      ventilordnunglade: this.massnahme.tastenreihes[0].werks[0].ladens[0].ventilordnunglade,
      rasterbrettbeschreibung: this.massnahme.tastenreihes[0].werks[0].ladens[0].rasterbrettbeschreibung,
      inschriften: this.massnahme.tastenreihes[0].werks[0].ladens[0].inschriften,
      kommentarladen: this.massnahme.tastenreihes[0].werks[0].ladens[0].kommentarladen,
      tonumfang: this.massnahme.tastenreihes[0].werks[0].ladens[0].tonumfang,
      xid: this.massnahme.tastenreihes[0].werks[0].ladens[0].xid,
    });
  }

  populateLadenData() {
    this.ladenData.id = this.ladenForm.value.id;
    this.ladenData.werk = this.ladenForm.value.werk;
    this.ladenData.position = this.ladenForm.value.position;
    this.ladenData.name = this.ladenForm.value.name;
    this.ladenData.ladentypen = this.ladenForm.value.ladentypen;
    this.ladenData.tonumfangmanualwerke = this.ladenForm.value.tonumfangmanualwerke;
    this.ladenData.winddruck = this.ladenForm.value.ladenerhalten;
    this.ladenData.ladenerhalten = this.ladenForm.value.id;
    this.ladenData.dichtungsystemlade = this.ladenForm.value.dichtungsystemlade;
    this.ladenData.ventilordnunglade = this.ladenForm.value.ventilordnunglade;
    this.ladenData.rasterbrettbeschreibung = this.ladenForm.value.rasterbrettbeschreibung;
    this.ladenData.inschriften = this.ladenForm.value.inschriften;
    this.ladenData.kommentarladen = this.ladenForm.value.kommentarladen;
    this.ladenData.tonumfang = this.ladenForm.value.tonumfang;
    this.ladenData.xid = this.ladenForm.value.xid;
  }

  populateRegisterForm() {
    this.registerForm.setValue({
      id: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].id,
      laden: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].laden,
      position: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].position,
      name: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].name,
      tonhoehe: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].tonhoehe,
      kommentar: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].kommentar,
      positionlade: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].positionlade,
      material: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].material,
      registererhalten: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].registererhalten,
      idorgelvorher: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].idorgelvorher,
      idorgelnachher: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].idorgelnachher,
      xid: this.massnahme.tastenreihes[0].werks[0].ladens[0].registers[0].xid,
    });
  }

  populateRegisterData() {
    this.registerData.id = this.registerForm.value.id;
    this.registerData.laden = this.registerForm.value.laden;
    this.registerData.position = this.registerForm.value.position;
    this.registerData.name = this.registerForm.value.name;
    this.registerData.tonhoehe = this.registerForm.value.tonhoehe;
    this.registerData.kommentar = this.registerForm.value.kommentar;
    this.registerData.positionlade = this.registerForm.value.positionlade;
    this.registerData.material = this.registerForm.value.material;
    this.registerData.registererhalten = this.registerForm.value.registererhalten;
    this.registerData.idorgelvorher = this.registerForm.value.idorgelvorher;
    this.registerData.idorgelnachher = this.registerForm.value.idorgelnachher;
    this.registerData.xid = this.massnahme.tastenreihes[0].werks[0].ladens[0].xid;
  }

  populateMediaForm() {
    this.mediaForm.setValue({
      daten: this.massnahme.media[0].daten,
      mediumtyp: this.massnahme.media[0].mediumtyp,
      name: this.massnahme.media[0].name,
      datum: this.massnahme.media[0].datum,
      beschreibung: this.massnahme.media[0].beschreibung,
    });
  }

  populateMediaData() {
      this.mediaData.daten = this.mediaForm.value.daten;
      this.mediaData.mediumtyp = this.mediaForm.value.mediumtyp;
      this.mediaData.name = this.mediaForm.value.name;
      this.mediaData.datum = this.mediaForm.value.datum;
      this.mediaData.beschreibung = this.mediaForm.value.beschreibung;
  }


  openDialogDatumNeubau(): void {
    const dialogRef = this.dialog.open(DateDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.orgelForm.controls['neubaudatum'].setValue(result);
      if (result == false) {
      this.orgelForm.controls['neubaudatum'].setValue(this.massnahme.orgelNavigation.neubaudatum);
      }
    });
  }

  openDialogDatumGeb(): void {
    const dialogRef = this.dialog.open(DateDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.orgelForm.controls['datumgebäude'].setValue(result);
      if (result == false) {
      this.orgelForm.controls['datumgebäude'].setValue(this.massnahme.orgelNavigation.datumbaugebaude);
      }
    });
  }

  openDialogGebDatum(): void {
    const dialogRef = this.dialog.open(DateDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kontaktForm.controls['geburtsdatum'].setValue(result);
      if (result == false) {
      this.kontaktForm.controls['geburtsdatum'].setValue(this.massnahme.kontakts[0].geburtsdatum);
      }
    });
  }

  openDialogTaufDatum(): void {
    const dialogRef = this.dialog.open(DateDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kontaktForm.controls['taufdatum'].setValue(result);
      if (result == false) {
      this.kontaktForm.controls['taufdatum'].setValue(this.massnahme.kontakts[0].taufdatum);
      }
    });
  }

  openSterbeDatum(): void {
    const dialogRef = this.dialog.open(DateDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kontaktForm.controls['sterbedatum'].setValue(result);
      if (result == false) {
      this.kontaktForm.controls['sterbedatum'].setValue(this.massnahme.kontakts[0].sterbedatum);
      }
    });
  }

  openBeerdigung(): void {
    const dialogRef = this.dialog.open(DateDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kontaktForm.controls['beerdigungsdatum'].setValue(result);
      if (result == false) {
      this.kontaktForm.controls['beerdigungsdatum'].setValue(this.massnahme.kontakts[0].beerdigungsdatum);
      }
    });
  }

  openGruendung(): void {
    const dialogRef = this.dialog.open(DateDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kontaktForm.controls['gruendungsdatum'].setValue(result);
      if (result == false) {
      this.kontaktForm.controls['gruendungsdatum'].setValue(this.massnahme.kontakts[0].gruendungsdatum);
      }
    });
  }

  openAufloesung(): void {
    const dialogRef = this.dialog.open(DateDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kontaktForm.controls['aufloesungsdatum'].setValue(result);
      if (result == false) {
      this.kontaktForm.controls['aufloesungsdatum'].setValue(this.massnahme.kontakts[0].aufloesungsdatum);
      }
    });
  }

  openMediaDate(): void {
    const dialogRef = this.dialog.open(DateDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.mediaForm.controls['datum'].setValue(result);
      if (result == false) {
      this.mediaForm.controls['datum'].setValue('Ungültiges Datum');
      }
    });
  }

  openDialogUser(): void {
    const dialogRef = this.dialog.open(UserDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kontaktForm.controls['benutzer'].setValue(result);
      if (result == false) {
      this.kontaktForm.controls['benutzer'].setValue(this.massnahme.kontakts[0].benutzer);
      }
    });
  }

  openDialogOrt(): void {
    const dialogRef = this.dialog.open(PlaceDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.orgelForm.controls['ort'].setValue(result);
      if (result == false) {
      this.orgelForm.controls['ort'].setValue(this.massnahme.orgelNavigation.ort);
      }
    });
  }

  openDialogOrtKontakt(): void {
    const dialogRef = this.dialog.open(PlaceDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kontaktForm.controls['ort'].setValue(result);
      if (result == false) {
      this.kontaktForm.controls['ort'].setValue(this.massnahme.kontakts[0].ort);
      }
    });
  }

  openDialogGeburt(): void {
    const dialogRef = this.dialog.open(PlaceDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kontaktForm.controls['geburtsort'].setValue(result);
      if (result == false) {
      this.kontaktForm.controls['geburtsort'].setValue(this.massnahme.kontakts[0].geburtsort);
      }
    });
  }

  openSterbeOrt(): void {
    const dialogRef = this.dialog.open(PlaceDialog, {
      width: '700px',
      height: '800px',
      data: {
        data: this.dateDataSource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kontaktForm.controls['sterbeort'].setValue(result);
      if (result == false) {
      this.kontaktForm.controls['sterbeort'].setValue(this.massnahme.kontakts[0].sterbeort);
      }
    });
  }

  onFileChange(event) {
    this.theFile = null;
    const MAX_SIZE: number = 1048576;
    const file = event.target.files[0];
    this.mediaForm.value.name = event.target.files[0].name;
    this.HandleMediaType(event.target.files[0].type)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.mediaForm.value.daten = (reader.result as string).split(',')[1];
      console.log(this.mediaForm.value.daten);
  };
    if (event.target.files && event.target.files.length > 0) {
        // Don't allow file sizes over 1MB
        if (event.target.files[0].size < MAX_SIZE) {
            // Set theFile property
            this.theFile = event.target.files[0];
        }
        else {
            // Display error message
            this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
        }
    }
    this.populateMediaForm();
}

HandleMediaType(type : string) {
  switch(type) { 
    case type = 'image/bmp': { 
      this.mediaForm.value.mediumtyp = 1;
       break; 
    } 
    case type = 'image/jpeg': { 
      this.mediaForm.value.mediumtyp = 2;
       break; 
    } 
    case type = 'application/pdf': { 
      this.mediaForm.value.mediumtyp = 3;
       break; 
    } 
    case type = 'image/gif': { 
      this.mediaForm.value.mediumtyp = 4;
       break; 
    } 
    case type = 'application/msword': { 
      this.mediaForm.value.mediumtyp = 5;
       break; 
    } 
    case type = 'audio/mpeg': { 
      this.mediaForm.value.mediumtyp = 6;
       break; 
    } 
    default: { 
      this.mediaForm.value.mediumtyp = 1;
       break; 
    } 
 } 
}

saveMedia() {
  this.populateMediaData();
  this.addMediaRow();
  this.uploadLog = 'Upload erfolgreich'
}

}