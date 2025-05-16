import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MenuItems } from '../shared/menuItems';
import { AuthService } from '../Services/auth.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      getUserData: () => ({ role: 'ENTREPRISE' })
    };

    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        MenuItems,
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userRole from AuthService', () => {
    expect(component.userRole).toBe('ENTREPRISE');
  });

  it('should toggle sidebar open/close', () => {
    expect(component.isOpen).toBeFalse();
    component.onToggleSidebar();
    expect(component.isOpen).toBeTrue();
    component.onToggleSidebar();
    expect(component.isOpen).toBeFalse();
  });

  it('should close sidebar and restore scroll', () => {
    component.isOpen = true;
    component.closeSidebar();
    expect(component.isOpen).toBeFalse();
    expect(document.body.style.overflow).toBe('');
  });
});
