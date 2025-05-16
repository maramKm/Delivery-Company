import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlatService } from '../../Services/plat.service';
import { SnackbarService } from '../../Services/snackbar.service';
import { GlobalConstant } from '../../shared/globalConstant';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-plat',
  standalone: false,
  templateUrl: './plat.component.html',
  styleUrl: './plat.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PlatComponent implements OnInit {
  @Output() onAddPlat: EventEmitter<any> = new EventEmitter();
  dialogAction: string = 'Add';
  action: string = 'Add';
  responseMessage: string = '';
  platForm!: FormGroup;
  selectedFile: File | null = null;
  platFormSubmitted = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private platService: PlatService,
    public dialog: MatDialogRef<PlatComponent>,
    private snackbar: SnackbarService,
    private auth:AuthService
  ) {}

  ngOnInit(): void {
    this.platForm = this.formBuilder.group({
      nom: [null, [Validators.required]],
      description: [null, [Validators.required]],
      prix: [null, [Validators.required]]
    });

    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.platForm.patchValue(this.dialogData.data);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  handleSubmit(): void {
    /*this.platFormSubmitted = true;
    if (!this.selectedFile) {
      this.snackbar.openSnackBar("Image is required", "error");
      return;
    }*/
    if (this.dialogAction === "Edit") {
      this.edit();
    } else {
      this.Add();
    }
  }

  edit(): void {
    const formValues = this.platForm.value;

    const payload = {
      id: this.dialogData.data.id,
      nom: formValues.nom,
      description: formValues.description,
      prix: formValues.prix
    };
    
    this.platService.updatePlat(payload).subscribe({
      next: (response: any) => {
        this.dialog.close();
        this.onAddPlat.emit();
        this.snackbar.openSnackBar(response.message);

      },
      error: (error) => {
        this.responseMessage = error.error?.message || GlobalConstant.genericError;
        this.snackbar.openSnackBar(this.responseMessage, "error");
      }
    });
  }    
  
  Add(): void {
    const formValues = this.platForm.value;
    const userData = this.auth.getUserData(); // Get user from localStorage
    
    const platData = {
      nom: formValues.nom,
      description: formValues.description,
      prix: formValues.prix,
      restaurantId: userData?.id  // Use ID from localStorage
    };
  
    console.log("Sending to backend:", platData); // Debug log
  
    this.platService.add(platData).subscribe({
      next: (response: any) => {
        this.dialog.close();
        this.onAddPlat.emit();
        this.snackbar.openSnackBar(response.message);  // ✅ now works
      },
      error: (error) => {
        const msg = error.error?.message || GlobalConstant.genericError;
        this.snackbar.openSnackBar(msg, "error");
      }
    });    
  }
  
  
}
