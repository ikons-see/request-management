import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-column',
  templateUrl: './date-column.component.html',
  styleUrls: ['./date-column.component.scss']
})
export class DateColumnComponent implements OnInit {

  @Input()
  value: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
