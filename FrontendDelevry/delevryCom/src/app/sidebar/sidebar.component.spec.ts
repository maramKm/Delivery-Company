import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MenuItems } from '../shared/menuItems';
import { AuthService } from '../Services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockAuthService: any;
  let mockChangeDetectorRef: any;
  let mockMediaMatcher: any;

  beforeEach(async () => {
    mockAuthService = {
      getUserData: () => ({ role: 'ENTREPRISE' })
    };

    mockChangeDetectorRef = {
      detectChanges: jasmine.createSpy('detectChanges')
    };

    mockMediaMatcher = {
      matchMedia: () => ({
        matches: false,
        addListener: jasmine.createSpy('addListener'),
        removeListener: jasmine.createSpy('removeListener')
      })
    };

    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        MenuItems,
        { provide: AuthService, useValue: mockAuthService },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
        { provide: mockMediaMatcher, useValue: mockMediaMatcher }
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

  it('should filter menu items based on user role', () => {
    expect(component.menuItems).toBeDefined();
    expect(component.menuItems.length).toBeGreaterThan(0);
    component.menuItems.forEach(item => {
      expect(item.role).toContain('ENTREPRISE');
    });
  });

  it('should detect mobile screens', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(500);
    component.checkScreenSize();
    expect(component.isMobile).toBeTrue();
    
    spyOnProperty(window, 'innerWidth').and.returnValue(1024);
    component.checkScreenSize();
    expect(component.isMobile).toBeFalse();
  });

  it('should clean up listeners on destroy', () => {
    spyOn(window, 'removeEventListener');
    component.ngOnDestroy();
    expect(mockMediaMatcher.matchMedia().removeListener).toHaveBeenCalled();
  });
});