import { Component, Input, OnInit } from '@angular/core';
import { ButtonConfiguration, ButtonType } from 'src/app/types/data-types';

@Component({
  selector: 'app-delete-details-modal',
  templateUrl: './delete-details-modal.component.html',
  styleUrls: ['./delete-details-modal.component.scss']
})
export class DeleteDetailsModalComponent implements OnInit {

  @Input()
  requestId: number;

  @Input()
  title: string;

  buttons: Array<ButtonConfiguration>;

  constructor() {
    this.initButtons();
   }

  ngOnInit(): void {
  }

  initButtons() {
    this.buttons = [
      {
        text: "Cancel",
        type: ButtonType.SECONDARY
      },
      {
        text: "Continue",
        type: ButtonType.DARK,
        onClick: (e) => this.deleteRequest()
      }
    ]
  }

  deleteRequest() {
    console.log('Deleting request');
  }

}
