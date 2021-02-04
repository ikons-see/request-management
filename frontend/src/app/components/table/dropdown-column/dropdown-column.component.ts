import { Component, Input, OnInit } from '@angular/core';
import { ButtonConfiguration, DropdownColumn } from 'src/app/types/data-types';

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

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(event, btn: ButtonConfiguration) {
    if (!btn.disabled) {
      btn.onClick(this.value);
    }
    event.stopPropagation();
  }
}
