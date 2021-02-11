import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationTab } from 'src/app/types/data-types';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input()
  loading = true;

  @Input()
  navigationTabs: Array<NavigationTab>;
  
  constructor() { }

  ngOnInit(): void {
  }
}
