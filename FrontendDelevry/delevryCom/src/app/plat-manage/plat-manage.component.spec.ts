import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatManageComponent } from './plat-manage.component';

describe('PlatManageComponent', () => {
  let component: PlatManageComponent;
  let fixture: ComponentFixture<PlatManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
