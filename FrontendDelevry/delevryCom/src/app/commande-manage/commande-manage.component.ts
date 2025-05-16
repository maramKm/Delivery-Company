import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../Services/auth.service';
import { CommandeService } from '../Services/commande.service';
import { SnackbarService } from '../Services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommandeComponent } from '../dialog/commande/commande.component';
import { GlobalConstant } from '../shared/globalConstant';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-commande-manage',
  standalone: false,
  templateUrl: './commande-manage.component.html',
  styleUrl: './commande-manage.component.css',
  
})
export class CommandeManageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'statut', 'total', 'actions'];
  dataSource: any;
  responseMessage: any;
  currentUser: any;

  constructor(
    private commandeService: CommandeService,
    private authService: AuthService,
    private dialog: MatDialog,
    private ngx: NgxUiLoaderService,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserData();
    this.ngx.start();

    this.tableData();
  }

  tableData() {
    if (this.currentUser && this.currentUser.role === 'CLIENT' && this.currentUser.id) {
      this.commandeService.getCommandesByClient(this.currentUser.id).subscribe(
        (response: any) => {
          this.ngx.stop();
          this.dataSource = new MatTableDataSource(response);
        },
        (error) => {
          this.ngx.stop();
          this.handleError(error);
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleModifyAction(commande: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: { ...commande }
    };
    dialogConfig.width = '500px';
  
    const dialogRef: MatDialogRef<CommandeComponent> = this.dialog.open(CommandeComponent, dialogConfig);
  
    dialogRef.componentInstance.onModifyCommande.subscribe((formData: any) => {
      this.modifyCommande(commande.id, formData);
    });
  }

  modifyCommande(commandeId: number, data: any) {
    this.ngx.start();
    this.commandeService.modifierCommande(commandeId, data).subscribe(
      (response: string) => {
        this.ngx.stop();
        this.responseMessage = response;
        this.snackBar.openSnackBar(this.responseMessage, 'success');
        this.tableData();
      },
      (error) => {
        this.ngx.stop();
        this.handleError(error);
      }
    );
  }

  handleCancelAction(commandeId: number) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '450px',
      data: {
        message: 'cancel this order?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelCommande(commandeId);
      }
    });
  }

  cancelCommande(commandeId: number) {
    this.ngx.start();
    this.commandeService.annuler(this.currentUser.id, { commandeId }).subscribe(
      (response: any) => {
        this.ngx.stop();
        this.responseMessage = response?.message || 'Commande annulée avec succès';
        this.snackBar.openSnackBar(this.responseMessage, 'success');
        this.tableData();
      },
      (error) => {
        this.ngx.stop();
        this.handleError(error);
      }
    );
  }

  private handleError(error: any) {
    this.ngx.stop();
    if (error.error?.message) {
      this.responseMessage = error.error.message;
    } else {
      this.responseMessage = GlobalConstant.genericError;
    }
    this.snackBar.openSnackBar(this.responseMessage, 'error');
  }
getStatusLabel(status: string): string {
  const statusLabels: { [key: string]: string } = {
    'EN_ATTENTE': 'Pending',
    'EN_PREPARATION': 'Preparing',
    'EN_LIVRAISON': 'Delivering',
    'LIVREE': 'Completed',
    'ANNULEE': 'Cancelled'
  };
  return statusLabels[status?.toUpperCase()] || status;
}

getStatusClass(status: string): string {
  switch (status?.toUpperCase()) {
    case 'EN_ATTENTE':
      return 'status-pending';
    case 'EN_PREPARATION':
      return 'status-preparing';
    case 'EN_LIVRAISON':
      return 'status-delivering';
    case 'LIVREE':
      return 'status-completed';
    case 'ANNULEE':
      return 'status-cancelled';
    default:
      return '';
  }
}

handleViewAction(commande: any) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
    action: 'View',
    data: { ...commande }
  };
  dialogConfig.width = '600px';  

  const dialogRef = this.dialog.open(CommandeComponent, dialogConfig);

}


refreshOrders(){}
}