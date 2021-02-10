import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { changeRequestStatus } from '../../../../store/administrator/administrator-actions';
import { ApplicationState } from '../../../../app.module';
import { ButtonConfiguration, ButtonType, RequestStatus } from '../../../../types/data-types';

@Component({
  selector: 'app-change-status-modal',
  templateUrl: './change-status-modal.component.html',
  styleUrls: ['./change-status-modal.component.scss']
})
export class ChangeStatusModalComponent implements OnInit {

  @Input()
  requestId: number;

  @Input()
  status: RequestStatus;

  title: string;
  notes: string = null;
  buttons: Array<ButtonConfiguration>;
  statuses = RequestStatus;
  validNotes: boolean = true;

  constructor(private store: Store<ApplicationState>,
    public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.initButtons();
    this.getModalTitle();
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
        onClick: (e) => this.performAction()
      }
    ]
  }

  checkNotes(e) {
    if (this.notes) {
      this.validNotes = true;
    } else this.validNotes = false;
  }

  performAction() {
    let performAction = false;
    if (this.status !== this.statuses.CLOSED) {
      performAction = true;
    } else if (this.notes) {
      performAction = true;
    }
    if (performAction) {
      this.store.dispatch(changeRequestStatus({ requestId: this.requestId, status: this.status, notes: this.notes }));
    } else {
      this.validNotes = false;
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  getModalTitle() {
    switch (this.status) {
      case RequestStatus.ON_GOING:
        this.title = 'Taking in charge request #';
        break;
      case RequestStatus.PENDING:
        this.title = 'Pending request #';
        break;
      case RequestStatus.REJECTED:
        this.title = 'Rejecting request #';
        break;
      case RequestStatus.CLOSED:
        this.title = 'Closing request #';
        break;
      default:
        this.title = 'Changing status for request #';
        break;
    }
  }

}
