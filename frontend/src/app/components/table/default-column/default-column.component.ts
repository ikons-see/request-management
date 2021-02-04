import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-column',
  templateUrl: './default-column.component.html',
  styleUrls: ['./default-column.component.scss']
})
export class DefaultColumnComponent implements OnInit {

  @Input()
  value: any;
  
  arrayValues: boolean;

  constructor() { }

  ngOnInit(): void {
    this.arrayValues = Array.isArray(this.value);
  }

}
