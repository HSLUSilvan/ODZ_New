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
  selector: 'app-orgelbauer-search',
  templateUrl: "./orgelbauer-search.component.html",
  styleUrls: [ './orgelbauer-search.component.scss' ]
})

export class OrgelbauerSearchComponent implements OnInit {

  // MatPaginator Inputs
 length = 10;
 pageSize = 30;
 pageSizeOptions: number[] = [5, 10, 25, 100];

 // MatPaginator Output
 pageEvent: PageEvent;


  displayedColumns= ['kontakts', 'name', 'kantonName', 'bezeichnung', 'gebaeude', 'details' ];
  dataSource!:MatTableDataSource<OrganSearch>;
  organ: OrganService[];
  place: Ort[];
  filterText = '';
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private organService: OrganService,
    private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.organService.getAllOrgans()
    .subscribe((organ) => {
      this.dataSource = new MatTableDataSource(organ);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      }
    });
  }

applyFilter(filterValue: string) {
  //filterValue = filterValue.trim(); // Remove whitespace
  //filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.filterText = filterValue.trim();
  this.dataSource.filter = filterValue;
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
