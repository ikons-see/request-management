import { Component, Input, OnInit } from '@angular/core';
import { ColumnType, TableConfig } from 'src/app/types/data-types';
import { Resource } from 'src/app/types/request-types';

@Component({
  selector: 'app-request-resources',
  templateUrl: './request-resources.component.html',
  styleUrls: ['./request-resources.component.scss']
})
export class RequestResourcesComponent implements OnInit {

  @Input()
  resources: Array<Resource>;

  tableConfiguration: TableConfig;
  
  constructor() { }

  ngOnInit(): void {
    this.initTable();
  }

  initTable() {
    this.tableConfiguration = {
      columns: [
        {
          type: ColumnType.STRING,
          field: 'total',
          text: 'Total'
        },
        {
          type: ColumnType.STRING,
          field: 'seniority',
          text: 'Seniority'
        },
        {
          type: ColumnType.STRING,
          field: 'skills',
          text: 'Skills'
        },
        {
          type: ColumnType.STRING,
          field: 'note',
          text: 'Notes'
        }
      ]
    };
  }
  
}
