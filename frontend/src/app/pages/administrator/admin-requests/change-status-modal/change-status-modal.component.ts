import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { changeRequestStatus } from '../../../../store/administrator/administrator-actions';
import { ApplicationState } from '../../../../app.module';
import { ButtonConfiguration, ButtonType, RequestStatus } from '../../../../types/data-types';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-status-modal',
  templateUrl: './change-status-modal.component.html',
  styleUrls: ['./change-status-modal.component.scss']
})
export class ChangeStatusModalComponent implements OnInit, OnDestroy {

  @Input()
  requestId: number;

  @Input()
  status: RequestStatus;

  title: string;
  notes: string = null;
  buttons: Array<ButtonConfiguration>;
  statuses = RequestStatus;
  validNotes: boolean = true;
  translationSub: Subscription;

  constructor(private store: Store<ApplicationState>,
    public bsModalRef: BsModalRef,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.translationSub =  this.translate.get('admin.change-status').subscribe(translations => {
      this.init(translations);
     });
  }

  init(translations: { [key: string]: string }) {
    this.buttons = [
      {
        text: translations['cancel'],
        type: ButtonType.SECONDARY,
        onClick: (e) => this.closeModal()
      },
      {
        text: translations['continue'],
        type: ButtonType.DARK,
        onClick: (e) => this.performAction()
      }
    ];

    switch (this.status) {
      case RequestStatus.ON_GOING:
        this.title = translations['take-in-charge'];
        break;
      case RequestStatus.PENDING:
        this.title = translations['pending'];
        break;
      case RequestStatus.REJECTED:
        this.title = translations['reject'];
        break;
      case RequestStatus.CLOSED:
        this.title = translations['close-request'];
        break;
      default:
        this.title = translations['default-title'];
        break;
    }
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

  ngOnDestroy() {
    this.translationSub.unsubscribe();
  }
}
