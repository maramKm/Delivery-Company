import { Component, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; // ✅ Ajouté !

@Component({
  selector: 'app-full',
  standalone: false,
  templateUrl: './full.component.html',
  styleUrl: './full.component.css',
  encapsulation: ViewEncapsulation.None

})
export class FullComponent {

  constructor(private breakpointObserver: BreakpointObserver) {}

  isSidebarOpen = false;
  isMobileView = false;

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  ngOnInit() {
    this.checkViewport();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) {
      this.isSidebarOpen = true; // Auto-open on desktop
    } else if (this.isSidebarOpen) {
      this.closeSidebar(); // Auto-close when resizing to mobile
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.updateBodyScroll();
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    this.updateBodyScroll();
  }

  private updateBodyScroll() {
    document.body.style.overflow = this.isSidebarOpen && this.isMobileView 
      ? 'hidden' 
      : '';
  }

}
