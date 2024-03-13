import { Component, OnInit } from '@angular/core';
import { Massnahme, Orgel } from '../api/Api';
import { OrganService } from '../service/organ.service';
import { OrganSearch } from '../service/organsearch';

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss']
})
export class OrganComponent implements OnInit {

  orgels: OrganSearch[] = [];

  constructor(private orgelService: OrganService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.orgelService.getAllOrgans()
    .subscribe(orgels => this.orgels = orgels);
  }

}
