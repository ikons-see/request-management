import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/app.module';
import { getCurrentUser } from 'src/app/store/common/common-reducer';
import { ActionType, ButtonConfiguration, DropdownColumn, RequestStatus } from 'src/app/types/data-types';

@Component({
  selector: 'app-dropdown-column',
  templateUrl: './dropdown-column.component.html',
  styleUrls: ['./dropdown-column.component.scss']
})
export class DropdownColumnComponent implements OnInit {

  @Input()
  value: any;

  @Input()
  dropdown: DropdownColumn;

  signedInUser: string;

  constructor(private store: Store<ApplicationState>) {
    this.store.select(getCurrentUser).subscribe(value => {
      this.signedInUser = value;
    })
  }

  ngOnInit(): void {}

  handleClick(event, btn: ButtonConfiguration) {
    if (!btn.disabled) {
      btn.onClick(this.value.requestId);
    }
    event.stopPropagation();
  }

  checkIfHidden(e) {
    if (this.value.status == RequestStatus.CLOSED) {
      if (e == ActionType.close || e == ActionType.edit) {
        return true;
      }
    } else if (this.value.status == RequestStatus.REJECTED) {
      if (e != ActionType.view && e != ActionType.history && e != ActionType.delete) {
        return true;
      }
    } else if (this.value.status == RequestStatus.PENDING) {
      if (e == ActionType.pending) {
        return true;
      }
    }
    else if (this.value.status == RequestStatus.ON_GOING) {
      if (e == ActionType.edit) {
        return this.value.lastModifiedBy != this.signedInUser;
      }
    }
    else return false;
  }
}
