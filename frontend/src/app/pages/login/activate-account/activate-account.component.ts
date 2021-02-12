import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/app.module';
import { RequestsManagementService } from 'src/app/endpoint/requests-management.service';
import { activateAccount } from 'src/app/store/global/global-actions';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  actiovationKey: string;

  constructor(private service: RequestsManagementService,
    private route: ActivatedRoute, 
    private router: Router,
    private store: Store<ApplicationState>) {
    this.route.queryParams.subscribe(paramMap => {
      this.actiovationKey = paramMap['key'];
    })
  }

  ngOnInit(): void {
  }

  activateAccount() {
    this.store.dispatch(activateAccount({activationKey: this.actiovationKey}));
  }

}
