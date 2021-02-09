import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationTab } from 'src/app/types/data-types';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input()
  tabs: Array<NavigationTab>;

  @Output()
  signingOut = new EventEmitter();

  signOutTab: NavigationTab;

  isNavbarCollapsed: boolean = false;

  constructor() { 
  }

  ngOnInit(): void {
    this.signOutTab = {
      tabName: 'Sign out',
      tabId: String(this.tabs.length)
    }
  }

  signOut() {
    this.signingOut.emit();
  }

}
