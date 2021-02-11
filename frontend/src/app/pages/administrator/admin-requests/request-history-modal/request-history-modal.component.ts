import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { getAuditError, getStatusLog } from 'src/app/store/administrator/administrator-reducer';
import { ButtonConfiguration, ButtonType } from 'src/app/types/data-types';
import { AuditEvent } from 'src/app/types/response-types';

@Component({
  selector: 'app-request-history-modal',
  templateUrl: './request-history-modal.component.html',
  styleUrls: ['./request-history-modal.component.scss']
})
export class RequestHistoryModalComponent implements OnInit {

  @Input()
  requestId: number;

  buttons: Array<ButtonConfiguration>;
  events$: Observable<Array<AuditEvent>>;
  error$: Observable<string>;

  constructor(private store: Store<ApplicationState>,
    public bsModalRef: BsModalRef) { 
      this.events$ = this.store.select(getStatusLog);
      this.error$ = this.store.select(getAuditError);
    }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.buttons = [
      {
        text: 'Cancel',
        type: ButtonType.SECONDARY,
        onClick: (e) => this.bsModalRef.hide()
      }
    ]
  }

}
