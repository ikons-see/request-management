import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginRequest, resetMessage } from '../../store/global/global-actions';
import { getErrorMessage } from '../../store/global/global-reducer';
import { ApplicationState } from '../../app.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  submitted: boolean = false;
  rememberMe: boolean = false;
  errorMessage$: Observable<string>;
  messageDismissed:boolean = false;

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
      this.store.dispatch(loginRequest({...this.formGroup.value, rememberMe: this.rememberMe}));
    }
  }

  hideMessage() {
    this.messageDismissed = true;
    this.store.dispatch(resetMessage());
  }
}
