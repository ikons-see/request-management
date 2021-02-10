import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ColumnType, TableConfig } from 'src/app/types/data-types';
import { Resource } from 'src/app/types/request-types';

@Component({
  selector: 'app-request-resources',
  templateUrl: './request-resources.component.html',
  styleUrls: ['./request-resources.component.scss']
})
export class RequestResourcesComponent implements OnInit, OnDestroy {

  @Input()
  resources: Array<Resource>;

  tableConfiguration: TableConfig;
  translationSub: Subscription;
  
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translationSub =  this.translate.get('requester').subscribe(translations => {
      this.init(translations);
     });
  }

  init(translations: { [key: string]: string }) {
    this.tableConfiguration = {
      columns: [
        {
          type: ColumnType.STRING,
          field: 'total',
          text: translations['total']
        },
        {
          type: ColumnType.STRING,
          field: 'seniority',
          text: translations['seniority']
        },
        {
          type: ColumnType.STRING,
          field: 'skills',
          text: translations['skills']
        },
        {
          type: ColumnType.STRING,
          field: 'note',
          text: translations['notes']
        }
      ]
    };
  }

  ngOnDestroy() {
    this.translationSub.unsubscribe();
  }
  
}
