import { Component, Input, OnInit } from '@angular/core';
import { NavigationTab } from 'src/app/types/data-types';

@Component({
  selector: 'app-navigation-tab',
  templateUrl: './navigation-tab.component.html',
  styleUrls: ['./navigation-tab.component.scss']
})
export class NavigationTabComponent {

  @Input()
  tab: NavigationTab;

  @Input()
  activeTab: string;
  
  constructor() { }

  handleClick(event, tab:NavigationTab) {
    tab.onClick(tab.tabId);
  }

}
