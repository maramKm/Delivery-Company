import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDelevryComponent } from './list-delevry.component';

describe('ListDelevryComponent', () => {
  let component: ListDelevryComponent;
  let fixture: ComponentFixture<ListDelevryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDelevryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDelevryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
