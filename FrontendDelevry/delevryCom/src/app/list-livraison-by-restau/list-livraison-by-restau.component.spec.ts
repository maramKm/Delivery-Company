import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLivraisonByRestauComponent } from './list-livraison-by-restau.component';

describe('ListLivraisonByRestauComponent', () => {
  let component: ListLivraisonByRestauComponent;
  let fixture: ComponentFixture<ListLivraisonByRestauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListLivraisonByRestauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLivraisonByRestauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
