import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownColumnComponent } from './dropdown-column.component';

describe('DropdownColumnComponent', () => {
  let component: DropdownColumnComponent;
  let fixture: ComponentFixture<DropdownColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
