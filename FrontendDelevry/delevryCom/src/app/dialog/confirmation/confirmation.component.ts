import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  standalone: false,
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  onEmitStatusChange = new EventEmitter();
  details: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    if (this.dialogData && this.dialogData.confirmation) {
      this.details = this.dialogData;
    }
  }

  handleChangeAction() {
    this.onEmitStatusChange.emit();
  }
}

