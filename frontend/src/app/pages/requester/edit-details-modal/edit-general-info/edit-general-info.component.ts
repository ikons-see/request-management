import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AreaOfInterest } from 'src/app/types/data-types';
import {getAreaOfInterests} from "../../../../store/requests/requests-reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-edit-general-info',
  templateUrl: './edit-general-info.component.html',
  styleUrls: ['./edit-general-info.component.scss']
})
export class EditGeneralInfoComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  areas = [];
  submittedForm: boolean = false;

  constructor(private store: Store) {
    this.store.select(getAreaOfInterests).subscribe(areaOfInterests => this.areas = areaOfInterests)
  }

  ngOnInit(): void {
    this.formGroup.get('areaOfInterest').valueChanges
    .subscribe(area => {
      if (area == AreaOfInterest.Other) {
        this.formGroup.controls['notes'].setValidators([Validators.required]);
      } else {
        this.formGroup.controls['notes'].clearValidators();
      }
      this.formGroup.controls['notes'].updateValueAndValidity();
    });
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
