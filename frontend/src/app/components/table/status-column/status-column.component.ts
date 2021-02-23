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
  completed: boolean;
  
  constructor() { }

  ngOnInit(): void {
    console.log('The input we get:', this.value);
    this.checkResources();
  }

  checkResources() {
    let completed = true;
    this.value.resources.forEach(el => {
      if(el.total != el.totalProvided) {
        completed = false;
      }
    });
    this.completed = completed;
  }

}
