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
  displayedColumns: string[] | undefined;
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
      this.displayedColumns= ['id', 'date', 'statut', 'total', 'actions'];
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
        else if (this.currentUser && this.currentUser.role === 'RESTAURANT' && this.currentUser.id) {
          this.displayedColumns = ['id', 'date', 'statut', 'total', 'client', 'actions'];
      this.commandeService.getAllCommandeByRestaurant(this.currentUser.id).subscribe(
        (response: any) => {
          const filteredOrders = response.filter((order: any) => 
            order.statut === 'EN_ATTENTE' || 
            order.statut === 'EN_PREPARATION' 
          );
          
          this.ngx.stop();
          this.dataSource = new MatTableDataSource(filteredOrders);
          
        },
        (error) => {
          this.ngx.stop();
          this.handleError(error);
        }
      );
    }
  }
  startPreparation(commandeId: number) {
    this.ngx.start();
    this.commandeService.preparerStatus(commandeId).subscribe(
      (response: any) => {
        this.ngx.stop();
        this.snackBar.openSnackBar('Commande mise en préparation', 'success');
        this.tableData(); // Refresh table
      },
      (error) => {
        this.ngx.stop();
        this.handleError(error);
      }
    );
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
  
    /*dialogRef.componentInstance.onModifyCommande.subscribe((formData: any) => {
      this.modifyCommande(commande.id, formData);
    });*/
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

handleCancelAction(orderId: number) {
  const dialogRef = this.dialog.open(ConfirmationComponent, {
    width: '450px',
    data: {
      message: 'Cancel order',
      confirmation: true // Nécessaire pour votre composant de confirmation existant
    }
  });

  // Adaptation pour fonctionner avec votre EventEmitter existant
  dialogRef.componentInstance.onEmitStatusChange.subscribe(() => {
    this.cancelOrder(orderId);
    dialogRef.close();
  });
}

cancelOrder(orderId: number) {
    this.ngx.start();
    this.commandeService.anuuler(orderId).subscribe(
        (response: any) => {
            this.ngx.stop();
            this.responseMessage = response || 'Order cancelled successfully';
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
    'ANNULÉE': 'Cancelled',
    'PREPARE' :'Ready'
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
    case 'ANNULÉE':
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

  markAsReady(commandeId: number) {
    this.ngx.start();
    this.commandeService.PretStatus(commandeId).subscribe(
      (response: any) => {
        this.ngx.stop();
        this.snackBar.openSnackBar('Commande prête pour livraison', 'success');
        this.tableData(); 
      },
      (error) => {
        this.ngx.stop();
        this.handleError(error);
      }
    );
  }


refreshOrders(){}
}