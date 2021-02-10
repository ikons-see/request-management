import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { ButtonConfiguration, ButtonType, Tab } from 'src/app/types/data-types';
import { RequestDetails } from 'src/app/types/request-types';

@Component({
  selector: 'app-view-details-modal',
  templateUrl: './view-details-modal.component.html',
  styleUrls: ['./view-details-modal.component.scss']
})
export class ViewDetailsModalComponent implements OnInit {

  @Input()
  requestId: number;

  @Input()
  title: string;

  @Input()
  details: RequestDetails;

  tabs: Array<Tab>;
  activeId: string = '0';
  buttons: Array<ButtonConfiguration>;
  requestSubscribtion: Subscription;
  
  constructor(private store: Store<ApplicationState>,
    public bsModalRef: BsModalRef) { 
    this.initButtons();
    this.initTabs();
  }

  ngOnInit(): void {
  }

  initButtons() {
    this.buttons = [
      {
        text: "Close",
        type: ButtonType.SECONDARY,
        onClick: (e) => this.bsModalRef.hide()
      }
    ]
  }

  initTabs() {
    this.tabs = [
      {
        id: '0',
        name: 'General Info',
        onClick: (e) => this.tabChanged(e)
      },
      {
        id: '1',
        name: 'Resources',
        onClick: (e) => this.tabChanged(e)
      }
    ]
  }

  tabChanged(e) {
    this.activeId = e;
  }
  
}
