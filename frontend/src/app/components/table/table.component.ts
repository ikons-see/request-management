import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Column, ColumnType, DropdownColumn, RequestStatus } from 'src/app/types/data-types';
import { RequestDetails } from 'src/app/types/request-types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  @Input()
  data ?: any[];
  
  @Input()
  columns: Column[];

  @Input()
  totalItems: number;

  @Input()
  currentPage: number = 1;

  @Input()
  itemsPerPage: number = 10;

  @Output()
  onRowClicked = new EventEmitter<any>();

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter<number>();
  
  rowClickable: boolean;
  columnType = ColumnType;
  status = RequestStatus;
  
  constructor() { }

  ngOnInit(): void {
  }

  onRowClick(datum: any, col: Column) {
      this.onRowClicked.emit({datum, column: col});
  }

  getFormattedValue(datum: any, col: Column): string {
    let val = datum[col.field];
    return val;
  }

  getDropdownConfig(datum: any, col: Column): DropdownColumn {
    if (col.defaultContent) {
      return col.defaultContent(datum);
    }
    return null;
  }

  setPage(page: number) {
    this.pageChange.emit(page);
  }

  checkResources(data: RequestDetails) {
    let completed = true;
    if(data.status != this.status.ON_GOING && data.status != this.status.UPDATED) {
      completed = false;
    }
    else {
      data.resources.forEach(el => {
        if(el.total != el.totalProvided) {
          completed = false;
        }
      });
     return completed ? 'completed' : 'not-completed'
    }
  }

}
