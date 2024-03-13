import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganService } from '../service/organ.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { OrganSearch } from '../service/organsearch';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAccordion } from '@angular/material/expansion';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-search-combined',
  templateUrl: "./search-combined.component.html",
  styleUrls: ['./search-combined.component.scss']
})

export class SearchCombinedComponent implements OnInit {

  // MatPaginator Inputs
  length = 10;
  pageSize = 30;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  dataLoaded: Promise<boolean>;

  displayedColumns = ['bezeichnung', 'name', 'kantonName', 'massnahme1', 'gebaeude', 'kontakts', 'details'];
  dataSource!: MatTableDataSource<OrganSearch>;
  organ$: Observable<OrganSearch[]>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('app-edit') selectedId!: any;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MapComponent) map: MapComponent;

  readonly formControl: AbstractControl;

  constructor(private organService: OrganService,
    private _liveAnnouncer: LiveAnnouncer,
    formBuilder: FormBuilder) {
    this.formControl = formBuilder.group({
      datumVon: '',
      datumBis: '',
      name: '',
      kantonName: '',
      gebaude: '',
      kontakts: '',
      massnahme1: ''
    })

    this.formControl.valueChanges.subscribe(value => {
      value.datumVon = this.AppendDate(value.datumVon, 1);
      value.datumBis = this.AppendDate(value.datumBis, 9);
      const filter = { ...value, name: value.name.trim().toLowerCase(), 
        datumVon: value.datumVon,
        datumBis: value.datumBis,
        massnahme1: value.massnahme1.trim().toLowerCase(), 
        kontakts: value.kontakts.trim().toLowerCase(),
        kantonName: value.kantonName.trim().toLowerCase() } as string;
      this.dataSource.filter = filter;
      console.log("From: " + value.datumVon + " To: " + value.datumBis);
    });
  }

  async ngOnInit(): Promise<void> {
    this.organService.getOrgans()
      .subscribe((organ) => {
        this.dataSource = new MatTableDataSource(organ);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       console.log(this.dataSource);
        this.dataSource.filterPredicate = ((data, filter) => {
          const a = !filter.massnahme1 || data.massnahme1?.toLowerCase().includes(filter.massnahme1);
          const b = !filter.name || data.name?.toLowerCase().includes(filter.name);
          const c = !filter.kontakts || data.kontakts[0].name?.toLowerCase().includes(filter.kontakts) || data.kontakts[0].vorname?.toLowerCase().includes(filter.kontakts);
          const d1 = !filter.datumVon  || filter.datumVon <= data.datum;
          const d2 = !filter.datumBis  || filter.datumBis >= data.datum;
          const e = !filter.kantonName || data.kantonName?.toLowerCase().includes(filter.kantonName);
          return a && b && c && d1 && d2 && e;
        }) as (OrganSearch, string) => boolean;
      }); 
      this.map.ngOnInit();  
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  GetStats(event: Event) {
    const element = event.target as HTMLInputElement
    if (element.checked) {
    this.formControl.value.kantonName = element.value;
    console.log(this.formControl.value.kantonName);
    }
}

  AppendDate(yearInput: string, defaultValue: number) {
    while (yearInput.length < 4) {
      yearInput = String(defaultValue.toString() + yearInput.toString())
    }
  return new Date(yearInput.trim() + "-01-01").toLocaleString().split(',')[0]
}

}