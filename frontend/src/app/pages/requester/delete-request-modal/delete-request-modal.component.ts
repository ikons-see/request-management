import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { deleteRequest } from 'src/app/store/requester/requester-actions';
import { getLoadingRequests } from 'src/app/store/requester/requester-reducer';
import { ButtonConfiguration, ButtonType } from 'src/app/types/data-types';

@Component({
  selector: 'app-delete-details-modal',
  templateUrl: './delete-details-modal.component.html',
  styleUrls: ['./delete-details-modal.component.scss']
})
export class DeleteRequestModalComponent implements OnInit {

  @Input()
  requestId: number;

  @Input()
  title: string;

  buttons: Array<ButtonConfiguration>;
  loading$: Observable<boolean>;

  constructor(private store: Store<ApplicationState>,
    public bsModalRef: BsModalRef) {
    this.initButtons();
    this.loading$ = this.store.select(getLoadingRequests);
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
        onClick: (e) => this.deleteRequest()
      }
    ]
  }

  deleteRequest() {
    this.store.dispatch(deleteRequest({requestId: this.requestId}));
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
