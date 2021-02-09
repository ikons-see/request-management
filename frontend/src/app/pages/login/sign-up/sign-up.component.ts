import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { registerUser } from 'src/app/store/global/global-actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  submitted: boolean = false;
  validPassword: boolean = false;
  passwordConfirmSub: Subscription;

  constructor(private formBuilder: FormBuilder,
    private store: Store<ApplicationState>) {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    this.passwordConfirmSub = this.formGroup.get('confirmPassword').valueChanges.subscribe(value => {
      this.validPassword = this.passwordCheck();
    });
  }

  firstName() {
    return this.formGroup.get('firstName');
  }

  lastName() {
    return this.formGroup.get('lastName');
  }

  username() {
    return this.formGroup.get('username');
  }

  email() {
    return this.formGroup.get('email');
  }

  password() {
    return this.formGroup.get('password');
  }

  confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }

  passwordCheck() {
    return this.password().value === this.confirmPassword().value;
  }

  onSubmit() {
    this.submitted = true;
    this.validPassword = this.passwordCheck();
    if (this.formGroup.valid && this.validPassword) {
      this.store.dispatch(registerUser(this.formGroup.value));
    }
  }

  ngOnDestroy() {
    this.passwordConfirmSub.unsubscribe();
  }
}
