import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommandeService } from '../../Services/commande.service';
import { GlobalConstant } from '../../shared/globalConstant';

@Component({
  selector: 'app-commande',
  standalone:false,
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  action: string | undefined;
  commande: any;
  details: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialogRef: MatDialogRef<CommandeComponent>,
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    this.action = this.dialogData.action;
    this.commande = this.dialogData.data;
    
    if (this.action === 'View') {
      this.loadCommandeDetails(this.commande.id);
    }
  }

  loadCommandeDetails(commandeId: number) {
    this.commandeService.getCommandeDetails(commandeId).subscribe(
      (response: any) => {
        this.details = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onClose() {
    this.dialogRef.close();
  }

  getStatusLabel(status: string): string {
  const statusLabels: { [key: string]: string } = {
    'EN_ATTENTE': 'Pending',
    'EN_PREPARATION': 'Preparing',
    'EN_LIVRAISON': 'Delivering',
    'LIVREE': 'Completed',
    'ANNULÉE': 'Cancelled'
  };
  return statusLabels[status?.toUpperCase()] || status;
}
}