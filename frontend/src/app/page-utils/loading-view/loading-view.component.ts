import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrls: ['./loading-view.component.scss']
})
export class LoadingViewComponent implements OnInit {

  @Input()
  icon: string = 'fa-search';

  @Input()
  message: string = 'Loading...';
  
  constructor() { }

  ngOnInit(): void {
  }

}
