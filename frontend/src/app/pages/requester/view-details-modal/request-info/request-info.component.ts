import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestStatus } from 'src/app/types/data-types';
import { RequestDetails } from 'src/app/types/request-types';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.scss']
})
export class RequestInfoComponent implements OnInit {

  @Input()
  request: RequestDetails;
  
  formGroup: FormGroup;
  statuses = RequestStatus;

  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      createdBy: this.request.displayName,
      areaOfInterest: this.request.areaOfInterest,
      startDate: this.datePipe.transform(this.request.startDate, 'dd MMM yyyy'),
      endDate: this.datePipe.transform(this.request.endDate, 'dd MMM yyyy'),
      projectDescription: this.request.projectDescription,
      notes: this.request.notes,
      closingNotes: this.request.statusNotes ? this.request.statusNotes : null
    });
  }

}
