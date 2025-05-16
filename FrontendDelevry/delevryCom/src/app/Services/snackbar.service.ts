import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: 'error' | 'success' = 'success'): void {
    const panelClass = action === 'error' ? ['black-snackbar'] : ['green-snackbar'];

    this.snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000,
      panelClass: panelClass
    });
  }
}
