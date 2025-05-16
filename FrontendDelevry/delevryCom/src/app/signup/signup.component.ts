import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { SnackbarService } from '../Services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../shared/globalConstant';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit{
  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      name : [null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      prenom : [null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      adresse : [null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      email : [null,[Validators.required,Validators.pattern(GlobalConstant.emailRegex)]],
      contactNumber : [null,[Validators.required,Validators.pattern(GlobalConstant.contactNumberRegex)]],
      password : [null,[Validators.required]],
      confirmPassword : [null,[Validators.required]],
      role: ['', Validators.required], 
      matriculeNumber: [''],
      restaurantName: [''],
      restaurantAddress: [''],
      entrepriseName:['',Validators.required]

    })
  }
  password = true ;
  confirmPassword=true ;
  signupForm : any = FormGroup;
  responseMessage:any;
  selectedRole: string = '';
  hidePassword: boolean = true;


  

  constructor(private formBuilder:FormBuilder,
    private router : Router,
    private userService : UserService,
    private snackBar:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService : NgxUiLoaderService
  ){}

  onRoleChange(event: MatSelectChange) {
    this.selectedRole = event.value;
    const role = this.selectedRole;
  
    if (role === 'livreur') {
      this.signupForm.get('matriculeNumber')?.setValidators([Validators.required]);
      this.signupForm.get('restaurantName')?.clearValidators();
      this.signupForm.get('entrepriseName')?.clearValidators();
    } else if (role === 'restaurant') {
      this.signupForm.get('restaurantName')?.setValidators([Validators.required]);
      this.signupForm.get('matriculeNumber')?.clearValidators();
      this.signupForm.get('entrepriseName')?.clearValidators();
    } else if (role === 'entreprise') {
      this.signupForm.get('entrepriseName')?.setValidators([Validators.required]);
      this.signupForm.get('matriculeNumber')?.clearValidators();
      this.signupForm.get('restaurantName')?.clearValidators();
    } else {
      // Si aucun rôle spécifique, on clear tout
      this.signupForm.get('matriculeNumber')?.clearValidators();
      this.signupForm.get('restaurantName')?.clearValidators();
      this.signupForm.get('entrepriseName')?.clearValidators();
    }
  
    // Très important : on met à jour la validation
    this.signupForm.get('matriculeNumber')?.updateValueAndValidity();
    this.signupForm.get('restaurantName')?.updateValueAndValidity();
    this.signupForm.get('entrepriseName')?.updateValueAndValidity();
  }
  

  validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    }
    return false;
  }

  handleSubmit() {
    this.ngxService.start();
  
    const formValues = this.signupForm.value;
  
    var data: any = {
      nom: formValues.name,
      prenom: formValues.prenom,
      email: formValues.email,
      password: formValues.password,
      tel: formValues.contactNumber,
      addresse: formValues.adresse,
      role: formValues.role
    };
  
    // Now add the extra fields depending on the role
    if (formValues.role === 'livreur') {
      data.matricule = formValues.matriculeNumber;
    } else if (formValues.role === 'restaurant') {
      data.nomRestau  = formValues.restaurantName;
    }else if(formValues.role==='entreprise'){
      data.nom_entrep=formValues.entrepriseName;
    }
    this.userService.signup(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage=response?.message;
      this.snackBar.openSnackBar(this.responseMessage);
      this.router.navigate(['/']);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=GlobalConstant.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage,'error');
    })
  }


}
