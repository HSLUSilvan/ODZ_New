import { Component, OnInit, ViewChild } from '@angular/core';
import { Massnahme, Orgel, Ort } from '../api/Api';
import { OrganService } from '../service/organ.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import { OrganSearch } from '../service/organsearch';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-search',
  templateUrl: "./search.component.html",
  styleUrls: [ './search.component.scss' ]
})

export class SearchComponent implements OnInit {

  // MatPaginator Inputs
 length = 10;
 pageSize = 30;
 pageSizeOptions: number[] = [5, 10, 25, 100];

 // MatPaginator Output
 pageEvent: PageEvent;


  displayedColumns= ['name', 'kantonName', 'bezeichnung', 'gebaeude', 'kontakts', 'details'];
  dataSource!:MatTableDataSource<OrganSearch>;
  organ: OrganSearch[];
  place: Ort[];
  filterText = '';
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('app-edit') selectedId! : any;

  constructor(private organService: OrganService,
    private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.organService.getOrgans()
    .subscribe((organ) => {
      this.dataSource = new MatTableDataSource(organ);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.filterTable();
  }


  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    this.dataSource.filter = filter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  filterTable() {
    this.dataSource.filterPredicate = (data: OrganSearch, filter: string): boolean => {
      return (
        data.name.toLocaleLowerCase().includes(filter)
      )
    }
  } 

 setPageSizeOptions(setPageSizeOptionsInput: string) {
   if (setPageSizeOptionsInput) {
     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
   }
 }

 nestedFilterCheck(search, data, key) {
  if (typeof data[key] === 'object') {
    for (const k in data[key]) {
      if (data[key][k] !== null) {
        search = this.nestedFilterCheck(search, data[key], k);
      }
    }
  } else {
    search += data[key];
  }
  return search;
}

editLink(id : any): void {
  OrganService.editId = id;
}

announceSortChange(sortState: Sort) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

}
