import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ButtonConfiguration } from '../../types/data-types';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  loading: boolean;

  @Input()
  empty: boolean;

  @Input()
  error?: string;

  @Input()
  buttons?: Array<ButtonConfiguration>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  handleClick(e: MouseEvent, btn: ButtonConfiguration) {
    if ( btn.onClick ) {
      btn.onClick(e);
    }
  }

}
