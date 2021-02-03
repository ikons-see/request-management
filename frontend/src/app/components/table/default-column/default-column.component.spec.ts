import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultColumnComponent } from './default-column.component';

describe('DefaultColumnComponent', () => {
  let component: DefaultColumnComponent;
  let fixture: ComponentFixture<DefaultColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
