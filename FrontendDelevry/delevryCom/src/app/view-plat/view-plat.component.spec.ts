import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlatComponent } from './view-plat.component';

describe('ViewPlatComponent', () => {
  let component: ViewPlatComponent;
  let fixture: ComponentFixture<ViewPlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPlatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
