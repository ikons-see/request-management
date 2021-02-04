import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Tab } from 'src/app/types/data-types';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input()
  tabs: Array<Tab>;

  @Input()
  activeId: string;

  @Input()
  disable: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  handleClick(event, tab:Tab) {
    tab.onClick(tab.id);
  }

}
