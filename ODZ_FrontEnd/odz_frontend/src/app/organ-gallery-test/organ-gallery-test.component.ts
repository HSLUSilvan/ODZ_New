import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api, Massnahme, Orgel } from '../api/Api';
import { OrganService } from '../service/organ.service';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-organ',
  templateUrl: './organ-gallery-test.component.html',
  styleUrls: [ './organ-gallery-test.component.scss' ]
})
export class OrganGalleryTestComponent implements OnInit {

  organ: Massnahme | any;
  dispo: Massnahme | any;
  history: Massnahme | any;
  URL: string;
  image: string;
  imageURL: string;
  myAngularxQrCode: string;
  @ViewChild(EditComponent) child: { onSearch: (arg0: any) => void; };  

  constructor(
    private route: ActivatedRoute,
    private organService: OrganService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getDispo();
    
  }

  getOrgan(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.organService.getOrgan(765)
      .subscribe(organ => {
        this.organ = organ;
        this.URL = "http://147.88.61.66/odz/organ/" + this.route.snapshot.paramMap.get('id');
        this.image = 'data:image/jpeg;base64,' + btoa(this.organ.media[0].daten);
      })
  }

  getDispo(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.organService.getDispo(765)
      .subscribe(dispo => this.dispo = dispo);
    this.getHistory();
    this.getOrgan();
  }

  getHistory(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.organService.getHistory(765)
      .subscribe(history => { 
        this.history = history
      });
      
  }

  changePage(): void {
    this.router.navigate([ 'id' ])
  }

  editLink(id : any): void {
    OrganService.editId = id;
  }
}
