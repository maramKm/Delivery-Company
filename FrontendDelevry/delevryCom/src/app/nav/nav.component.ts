import { Component, EventEmitter, HostListener, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  role: any;
  isMobile = false;
  isSidebarOpen = false; // <-- ajouté pour gérer l’état du menu

  @Output() menuToggle = new EventEmitter<void>();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  onMenuClick() {
    this.menuToggle.emit();
  }

  onToggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.menuToggle.emit(); // <-- émet un événement vers le parent
    if (this.isMobile) {
      document.body.style.overflow = this.isSidebarOpen ? 'hidden' : '';
    }
  }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout',
      confirmation: true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(() => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['']);
    });
  }
}
