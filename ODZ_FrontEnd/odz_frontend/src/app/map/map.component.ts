import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { Orgel } from '../api/Api';
import { OrganService } from '../service/organ.service';
import { styles } from './map.styles';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  title = 'google-maps';
  map: google.maps.Map;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  organ: Orgel[] | any;
  marker: google.maps.Marker;
  markerArray = [];
  infoWindow: google.maps.InfoWindow;
  InforObj = [];
  term: string;
  infoWindowContent: {
    id: undefined,
    action: undefined,
    organBuilder: undefined,
    building: undefined,
    date: undefined,
    zip: undefined,
    location: undefined
  };

  constructor(private organService: OrganService,
    private _router: Router) { }

  async ngOnInit(): Promise<void> {
    const response = this.organService.getMapOrgan()
      .subscribe(async response => {
        this.organ = response;
        for (let o in this.organ) {
          this.organ[o].latitude = parseFloat(this.organ[o].latitude);
          this.organ[o].longitude = parseFloat(this.organ[o].longitude);
          //console.log("Organ:" + this.organ[o].id + this.organ[o].latitude + this.organ[o].longitude);
        }
        let loader = new Loader({
          apiKey: 'AIzaSyCpjVzRN8JxgBoa-9-vuYbbJxveu2owXuE',
        })

        await loader.load().then(() => {
          console.log('loaded gmaps')
          const location = { lat: 47.043935, lng: 8.310758 }

          this.map = new google.maps.Map(document.getElementById("map"), {
            center: location,
            zoom: 8,
            mapTypeId: "roadmap"
          })
        })
        this.addMarkers();
      });
  }

  async addMarkers(): Promise<void> {
    for (let i = 0; i < this.organ.length; i++) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.organ[i].latitude, this.organ[i].longitude),
        map: this.map,
        title: this.organ[i].plz + ' ' + this.organ[i].name,
        optimized: true
      });

      const infoWindow = new google.maps.InfoWindow({
        content: '<h3>' + this.organ[i].gebaeude + '</h3>Ort: ' + this.organ[i].plz + ' ' + this.organ[i].name + '<br>Gebäudeteil: ' + this.organ[i].gebaeudeteil + '<br><a href="http://147.88.61.66/odz/organ/' + this.organ[i].id + '">Details</a><br><br>Longitude: ' + this.organ[i].longitude + '<br>Latitude: ' + this.organ[i].latitude
      });
      marker.addListener('click', () => {
        this.closeOtherInfo();
        infoWindow.open(marker.get('map'), marker);
        this.InforObj[0] = infoWindow;
      });
      infoWindow.addListener('closeclick', () => {
        // Handle focus manually.
      });
      this.markerArray.push(marker);
    }
    console.log("Added Marker Listener");

  }

  closeOtherInfo() {
    if (this.InforObj.length > 0) {
      this.InforObj[0].set("marker", null);
      this.InforObj[0].close();
      this.InforObj.length = 0;
    }
  }

  setMapOnAll(map: google.maps.Map | null) {
    for (let i = 0; i < this.markerArray.length; i++) {
      this.markerArray[i].setMap(null);
    }
  }


  FilterMarkers() {
    //console.log(this.term);
    //const filter = this.markerArray.filter( marker => marker.getTitle().indexOf(this.term) >= 0);
    for (const marker of this.markerArray) {
      if (marker.getTitle().toLowerCase().includes(this.term.toLowerCase())) {
        marker.setMap(this.map);
      }
      else {
        marker.setMap(null);
      }
      if (this.term == '') {
        marker.setMap(this.map);
      }
    }
  }

  ResetMarkers() {
    this.term = '';
    this.FilterMarkers();
  }

  openInfoWindow(marker: google.maps.Marker) {
    this.removeInfoWindowContent();
    this.infoWindow.open(this.map, marker);
    this.infoWindowContent.id = this.organ.id;
    this.infoWindowContent.location = this.organ.ort;
    this.infoWindowContent.zip = this.organ.plz;
    this.infoWindowContent.organBuilder = this.organ.orgelbauer;
    this.infoWindowContent.building = this.organ.gebaeude;
    this.infoWindowContent.action = this.organ.massnahme;
    this.infoWindowContent.date = this.organ.datum;
  }

  removeInfoWindowContent() {
    for (let i in this.infoWindowContent) {
      this.infoWindowContent[i] = undefined;
    }
  }
}