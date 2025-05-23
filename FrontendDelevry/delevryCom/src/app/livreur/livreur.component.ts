import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../Services/snackbar.service';
import { LivraisonService } from '../Services/livraison.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstant } from '../shared/globalConstant';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-livreur',
  standalone: false,
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'client', 'restaurant', 'statut', 'actions'];
  dataSource: any;
  responseMessage: any;
  livreurId!: number;

  constructor(
    private livraisonService: LivraisonService,
    private ngx: NgxUiLoaderService,
    private snackBar: SnackbarService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.livreurId = this.authService.getCurrentUserId()!;
    this.ngx.start();
    this.loadDeliveries();
    
    // Refresh every 30 seconds
    setInterval(() => {
      this.loadDeliveries();
    }, 30000);
  }

  loadDeliveries() {
    this.livraisonService.getLivraisonsLivreur(this.livreurId).subscribe(
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

  acceptDelivery(livraisonId: number) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '450px',
      data: {
        message: 'Accept this delivery?',
        confirmation: true
      }
    });

    dialogRef.componentInstance.onEmitStatusChange.subscribe(() => {
      this.confirmAcceptance(livraisonId);
      dialogRef.close();
    });
  }

  confirmAcceptance(livraisonId: number) {
    this.ngx.start();
    const data = {
      livraisonId: livraisonId,
      livreurId: this.livreurId
    };
    console.log('Sending payload:', data);
    this.livraisonService.accepterLivraison(data).subscribe(
    (response: any) => {
      this.ngx.stop();
      this.snackBar.openSnackBar('Delivery accepted successfully', 'success');
      this.loadDeliveries();
    },
    (error) => {
      this.ngx.stop();
      this.handleError(error);
    }
  );

  }

markAsDelivered(livraisonId: number) {
  const dialogRef = this.dialog.open(ConfirmationComponent, {
    width: '450px',
    data: {
      message: 'Mark this delivery as completed?',
      confirmation: true
    }
  });

  dialogRef.componentInstance.onEmitStatusChange.subscribe(() => {
    this.confirmDeliveryCompletion(livraisonId); // ← Handles the actual API call
    dialogRef.close();
  });
}

confirmDeliveryCompletion(livraisonId: number) {
  this.ngx.start(); // Show loader
  this.livraisonService.marquerCommeLivree(livraisonId).subscribe({
    next: (response) => {
      this.ngx.stop();
      if (response.success) {
        this.snackBar.openSnackBar(response.message, 'success');
        this.loadDeliveries(); // Refresh the delivery list
      } else {
        this.snackBar.openSnackBar(response.message, 'error');
      }
    },
    error: (error) => {
      this.ngx.stop();
      this.snackBar.openSnackBar(error.message || 'Failed to mark delivery', 'error');
    }
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      'EN_ATTENTE': 'Pending Acceptance',
      'EN_COURS': 'In Progress',
      'LIVREE': 'Delivered',
      'CONFIRMEE': 'Confirmed',
      'PREPARE': 'Ready for Delivery',
      'ANNULÉE': 'Cancelled'
    };
    return statusLabels[status?.toUpperCase()] || status;
  }

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'EN_ATTENTE':
        return 'status-pending';
      case 'EN_COURS':
        return 'status-in-progress';
      case 'LIVREE':
        return 'status-delivered';
      case 'CONFIRMEE':
        return 'status-confirmed';
      case 'PREPARE':
        return 'status-ready';
      case 'ANNULÉE':
        return 'status-cancelled';
      default:
        return '';
    }
  }
}
