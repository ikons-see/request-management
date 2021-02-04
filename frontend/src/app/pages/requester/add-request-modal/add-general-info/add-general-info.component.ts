import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AreaOfInterest } from 'src/app/types/data-types';

@Component({
  selector: 'app-add-general-info',
  templateUrl: './add-general-info.component.html',
  styleUrls: ['./add-general-info.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class AddGeneralInfoComponent implements OnInit {

  @Input()
  form: FormGroup;

  areas = Object.values(AreaOfInterest);
  submittedForm: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form.get('areaOfInterest').valueChanges
    .subscribe(area => {
      if (area == AreaOfInterest.Other) {
        this.form.controls['notes'].setValidators([Validators.required]);
      } else {
        this.form.controls['notes'].clearValidators();
      }
      this.form.controls['notes'].updateValueAndValidity();
    });
  }

  notes() {
    return this.form.get('notes');
  }

  areaOfInterest() {
    return this.form.get('areaOfInterest');
  }

  projectDescription() {
    return this.form.get('projectDescription');
  }

  dateRange() {
    return this.form.get('dateRange');
  }

  onSubmit() {
    this.submittedForm = true;
  }

}
