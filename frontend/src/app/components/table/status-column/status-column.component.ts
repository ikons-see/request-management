import { Component, Input, OnInit } from '@angular/core';
import { RequestStatus } from '../../../types/data-types';

@Component({
  selector: 'app-status-column',
  templateUrl: './status-column.component.html',
  styleUrls: ['./status-column.component.scss']
})
export class StatusColumnComponent implements OnInit {

  @Input()
  value: any;

  status = RequestStatus;
  
  constructor() { }

  ngOnInit(): void {
  }
}
