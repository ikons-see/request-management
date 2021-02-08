import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApplicationState } from 'src/app/app.module';
import { closeRequest } from 'src/app/store/requester/requester-actions';
import { ButtonConfiguration, ButtonType } from 'src/app/types/data-types';

@Component({
  selector: 'app-close-request-modal',
  templateUrl: './close-request-modal.component.html',
  styleUrls: ['./close-request-modal.component.scss']
})
export class CloseRequestModalComponent implements OnInit {

  @Input()
  requestId: number;

  @Input()
  title: string;

  buttons: Array<ButtonConfiguration>;
  
  constructor(private store: Store<ApplicationState>,
    public bsModalRef: BsModalRef) {
    this.initButtons();
   }

  ngOnInit(): void {
  }

  initButtons() {
    this.buttons = [
      {
        text: "Cancel",
        type: ButtonType.SECONDARY,
        onClick: (e) => this.closeModal()
      },
      {
        text: "Continue",
        type: ButtonType.DARK,
        onClick: (e) => this.closeRequest()
      }
    ]
  }

  closeRequest() {
    this.store.dispatch(closeRequest({requestId: this.requestId}));
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
