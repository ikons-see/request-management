import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AreaOfInterest } from 'src/app/types/data-types';
import { RequestDetails } from 'src/app/types/request-types';

@Component({
  selector: 'app-edit-general-info',
  templateUrl: './edit-general-info.component.html',
  styleUrls: ['./edit-general-info.component.scss']
})
export class EditGeneralInfoComponent implements OnInit {

  @Input()
  formGroup: FormGroup;
  
  areas = Object.values(AreaOfInterest);
  submittedForm: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  notes() {
    return this.formGroup.get('notes');
  }

  areaOfInterest() {
    return this.formGroup.get('areaOfInterest');
  }

  projectDescription() {
    return this.formGroup.get('projectDescription');
  }

  dateRange() {
    return this.formGroup.get('dateRange');
  }

  onSubmit() {
    this.submittedForm = true;
  }

}
