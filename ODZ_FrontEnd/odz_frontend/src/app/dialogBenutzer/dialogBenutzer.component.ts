import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { OrganService } from "../service/organ.service";

@Component({
    selector: 'app-dialog-benutzer',
    templateUrl: './dialogBenutzer.component.html',
    styleUrls: [ './dialogBenutzer.component.scss' ]
  })
  export class UserDialog {

    
  // MatPaginator Inputs
  length = 10;
  pageSize = 8;
  pageSizeOptions: number[] = [4, 8];
  
  displayedColumns= ['id', 'name', 'auswahl'];
  dataSource3:MatTableDataSource<any>;
  filterText = '';
  pageEvent: PageEvent;
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild('matsort') matsort! : MatSort;
  
    constructor(
      public dialogRef: MatDialogRef<UserDialog>,
      private organService: OrganService,
      @Inject(MAT_DIALOG_DATA) public data: UserDialogData) {}
      
    
    onNoClick(): void {
      this.dialogRef.close(false);
    }

    ngOnInit(): void {
      this.organService.getUsers()
      .subscribe((user) => {
        this.dataSource3 = new MatTableDataSource(user);
        this.dataSource3.paginator = this.paginator;
        this.dataSource3.sort = this.matsort;
        this.dataSource3.filterPredicate = (data, filter: string) => {
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
    this.dataSource3.filter = filterValue;
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


  export interface UserDialogData {
    id: number;
    name: string;
  }
  