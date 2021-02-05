import { Component, Input, OnInit } from '@angular/core';
import { NavigationTab } from 'src/app/types/data-types';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input()
  tabs: Array<NavigationTab>;

  activeTab: string = '0';
  isNavbarCollapsed: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  tabClick(id) {
    this.activeTab = id;
  }

}
