import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedAppComponent } from './authenticated-app.component';

describe('AuthenticatedAppComponent', () => {
  let component: AuthenticatedAppComponent;
  let fixture: ComponentFixture<AuthenticatedAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatedAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
