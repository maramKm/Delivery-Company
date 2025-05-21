import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDelevryComponent } from './assign-delevry.component';

describe('AssignDelevryComponent', () => {
  let component: AssignDelevryComponent;
  let fixture: ComponentFixture<AssignDelevryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignDelevryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDelevryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
