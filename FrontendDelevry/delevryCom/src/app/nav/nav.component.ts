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
export class NavComponent implements OnInit{
  role:any;
  constructor(private router:Router,
    private dialog:MatDialog,
    private breakpointObserver: BreakpointObserver
  ){}
  @Output() menuToggle = new EventEmitter<void>();
  isMobile= false;

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

  logout(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      message : 'Logout',
      confirmation :true
    }
    const dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub= dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['']);
    })
  }

}
