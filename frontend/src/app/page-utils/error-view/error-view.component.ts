import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.scss']
})
export class ErrorViewComponent implements OnInit {

  @Input()
  title: string = "Something went wrong";

  @Input()
  message: string = "Please try again later";
  
  constructor() { }

  ngOnInit(): void {
  }

}
