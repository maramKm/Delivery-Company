import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../Services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../Services/snackbar.service';
import { GlobalConstant } from '../shared/globalConstant';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  signinForm :any = FormGroup;
  hide = true;
  responseMessage:any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router ,
    private authService:AuthService  
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]],
      password: [null, Validators.required]
    });
  }


  handleSubmit(): void {
    if (this.signinForm.invalid) {
      this.snackbarService.openSnackBar('Please fill all required fields correctly.', 'error');
      return;
    }

    this.ngxService.start();
    const formData = this.signinForm.value;

    const data = {
      email: formData.email,
      password: formData.password
    };

    this.userService.login(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.authService.saveUserData(response);
        this.dialogRef.close();
        this.snackbarService.openSnackBar('Login successful.', 'success');
        this.router.navigate(['/delevry']);
      },
      error: (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error.message;
        } else {
          this.responseMessage = GlobalConstant.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, 'error');
      }
    });
  }
}
