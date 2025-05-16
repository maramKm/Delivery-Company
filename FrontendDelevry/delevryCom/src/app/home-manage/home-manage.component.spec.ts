import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeManageComponent } from './home-manage.component';

describe('HomeManageComponent', () => {
  let component: HomeManageComponent;
  let fixture: ComponentFixture<HomeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
