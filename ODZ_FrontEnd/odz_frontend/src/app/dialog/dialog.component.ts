import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { OrganService } from "../service/organ.service";

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: [ './dialog.component.scss' ]
  })
  export class DateDialog {

    
  // MatPaginator Inputs
  length = 10;
  pageSize = 8;
  pageSizeOptions: number[] = [4, 8];
  
  displayedColumns= ['id', 'datum', 'bezeichnung', 'auswahl'];
  dataSource:MatTableDataSource<DateDialog>;
  filterText = '';
  pageEvent: PageEvent;
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild('matsort') matsort! : MatSort;
  
    constructor(
      public dialogRef: MatDialogRef<DateDialog>,
      private organService: OrganService,
      @Inject(MAT_DIALOG_DATA) public data: DateDialogData) {}
      
    
    onNoClick(): void {
      this.dialogRef.close(false);
    }

    ngOnInit(): void {
      this.organService.getDates()
      .subscribe((organ) => {
        this.dataSource = new MatTableDataSource(organ);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matsort;
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
    this.filterText = filterValue.trim();
    this.dataSource.filter = filterValue;
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


  export interface DateDialogData {
    id: number;
    datum: string;
    bezeichung: string;
  }
  