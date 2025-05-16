import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeManageComponent } from './commande-manage.component';

describe('CommandeManageComponent', () => {
  let component: CommandeManageComponent;
  let fixture: ComponentFixture<CommandeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandeManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
