import { DialogConfig } from '@angular/cdk/dialog';
import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
  }
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private dialog : MatDialog){}

  handleSignupAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width='550px',
    this.dialog.open(SignupComponent,dialogConfig);
    this.isMenuOpen = false;
  }
  handleLoginAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width='550px',
    this.dialog.open(LoginComponent,dialogConfig);
    this.isMenuOpen = false; 
  }
  

}
