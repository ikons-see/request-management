import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApplicationState } from 'src/app/app.module';
import { addRequestFilters, resetRequestFilters } from 'src/app/store/requests-actions';
import { getFilters } from 'src/app/store/requests-reducer';
import { AreaOfInterest, RequestStatus, Seniority, Skills } from 'src/app/types/data-types';
import { RequestFilters } from 'src/app/types/request-types';

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss']
})
export class FiltersPanelComponent implements OnInit {

  formGroup: FormGroup;
  areas = Object.values(AreaOfInterest);
  seniorities = Object.values(Seniority);
  skills = Object.values(Skills);
  statuses = Object.values(RequestStatus);
  formGroupSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private store: Store<ApplicationState>) {

    this.formGroup = this.formBuilder.group({
      statuses: [''],
      areaOfInterest: [''],
      startDate: [''],
      endDate: [''],
      projectDescription: [''],
      total: [''],
      seniority: [''],
      skills: ['']
    });
  }

  ngOnInit(): void {
    this.store.select(getFilters).pipe(take(1)).subscribe(value => {
      this.formGroup.patchValue({...value});
    });
  }

  applyFilters() {
    this.store.dispatch(addRequestFilters({requestFilters: this.formGroup.value}));
  }

  resetFilters() {
    this.store.dispatch(resetRequestFilters());
    this.store.select(getFilters).pipe(take(1)).subscribe(value => {
      this.formGroup.patchValue({...value});
    });
  }

}
