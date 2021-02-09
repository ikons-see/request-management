import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { loginRequest, resetMessage } from 'src/app/store/global/global-actions';
import { getErrorMessage } from 'src/app/store/global/global-reducer';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formGroup: FormGroup;
  submitted: boolean = false;
  rememberMe: boolean = false;
  errorMessage$: Observable<string>;
  messageDismissed: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private store: Store<ApplicationState>) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  ngOnInit(): void {
  }

  username() {
    return this.formGroup.get('username');
  }

  password() {
    return this.formGroup.get('password');
  }

  onCheckChange(e) {
    this.rememberMe = !this.rememberMe;
  }

  onSubmit() {
    this.submitted = true;
    this.messageDismissed = false;
    if (this.formGroup.valid) {
      this.store.dispatch(loginRequest({ ...this.formGroup.value, rememberMe: this.rememberMe }));
    }
  }

  hideMessage() {
    this.messageDismissed = true;
    this.store.dispatch(resetMessage());
  }

}
