import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItems } from '../shared/menuItems';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  userRole: any;
  isOpen = false;
  isMobile = false;
  menuItems: any[] = [];
  resizeListener!: () => void; // <- FIXED HERE

  constructor(public menuItem: MenuItems, private auth: AuthService) {
    const userRole = auth.getUserData()?.role;
    this.menuItems = this.menuItem.getMenuItems().filter(item =>
      item.role.includes(userRole)
    );
  }
  

  ngOnInit() {
    this.checkScreenSize();
    this.resizeListener = () => this.checkScreenSize();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  onToggleSidebar() {
    this.isOpen = !this.isOpen;
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
  }

  closeSidebar() {
    this.isOpen = false;
    document.body.style.overflow = '';
  }
}
