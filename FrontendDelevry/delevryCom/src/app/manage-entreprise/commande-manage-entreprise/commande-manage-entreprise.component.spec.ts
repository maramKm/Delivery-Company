import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeManageEntrepriseComponent } from './commande-manage-entreprise.component';

describe('CommandeManageEntrepriseComponent', () => {
  let component: CommandeManageEntrepriseComponent;
  let fixture: ComponentFixture<CommandeManageEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandeManageEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeManageEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
