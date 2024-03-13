import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { OrganService } from "../service/organ.service";

@Component({
    selector: 'app-dialog-ort',
    templateUrl: './dialogOrt.component.html',
    styleUrls: [ './dialogOrt.component.scss' ]
  })
  export class PlaceDialog {

    
  // MatPaginator Inputs
  length = 10;
  pageSize = 8;
  pageSizeOptions: number[] = [4, 8];
  
  displayedColumns= ['id', 'name', 'plz', 'kanton', 'auswahl'];
  dataSource2:MatTableDataSource<any>;
  filterText = '';
  pageEvent: PageEvent;
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild('matsort') matsort! : MatSort;
  
    constructor(
      public dialogRef: MatDialogRef<PlaceDialog>,
      private organService: OrganService,
      @Inject(MAT_DIALOG_DATA) public data: PlaceDialogData) {}
      
    
    onNoClick(): void {
      this.dialogRef.close(false);
    }

    ngOnInit(): void {
      this.organService.getPlaces()
      .subscribe((place) => {
        this.dataSource2 = new MatTableDataSource(place);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.matsort;
        this.dataSource2.filterPredicate = (data, filter: string) => {
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
    this.filterText = filterValue.trim();
    this.dataSource2.filter = filterValue;
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
}


  export interface PlaceDialogData {
    id: number;
    name: string;
    plz: string;
    kanton: string;
  }
  