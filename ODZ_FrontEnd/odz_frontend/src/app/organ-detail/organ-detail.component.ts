import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api, Massnahme, Orgel } from '../api/Api';
import { OrganService } from '../service/organ.service';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-organ',
  templateUrl: './organ-detail.component.html',
  styleUrls: [ './organ-detail.component.scss' ]
})
export class OrganDetailComponent implements OnInit {

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
    this.organService.getOrgan(id)
      .subscribe(organ => {
        this.organ = organ;
        this.URL = "http://localhost:4200/organ/" + this.route.snapshot.paramMap.get('id');
        this.image = 'data:image/jpeg;base64,' + btoa(this.organ.media[0].daten);
      })
  }

  getDispo(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.organService.getDispo(id)
      .subscribe(dispo => this.dispo = dispo);
    this.getHistory();
    this.getOrgan();
  }

  getHistory(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.organService.getHistory(id)
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
