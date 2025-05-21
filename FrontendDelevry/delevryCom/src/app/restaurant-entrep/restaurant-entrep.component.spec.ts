import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantEntrepComponent } from './restaurant-entrep.component';

describe('RestaurantEntrepComponent', () => {
  let component: RestaurantEntrepComponent;
  let fixture: ComponentFixture<RestaurantEntrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantEntrepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantEntrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
