import { Component } from '@angular/core';
import { LivraisonService } from '../Services/livraison.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { SnackbarService } from '../Services/snackbar.service';
import { GlobalConstant } from '../shared/globalConstant';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-client',
  standalone: false,
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  // Data sources for each table
  livraisonsAConfirmer = new MatTableDataSource<any>([]);
  livraisonsEnCours = new MatTableDataSource<any>([]);
  livraisonsTerminees = new MatTableDataSource<any>([]);

  // Columns for each table
  aConfirmerColumns = ['id', 'date', 'adresse',  'actions'];
  enCoursColumns = ['id', 'date', 'adresse', 'statut'];
  termineesColumns = ['id', 'date', 'adresse'];

  responseMessage: any;
  clientId!: number;

  constructor(
    private livraisonService: LivraisonService,
    private ngx: NgxUiLoaderService,
    private snackBar: SnackbarService,
    private dialog: MatDialog,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.ngx.start();
    this.clientId = this.authService.getCurrentUserId()!; // Should come from auth service
    this.loadLivraisons();
  }

  loadLivraisons(): void {
    this.livraisonService.getLivraisonsClient(this.clientId).subscribe({
      next: (response: any) => {
        this.ngx.stop();
        this.processLivraisons(response);
      },
      error: (error) => {
        this.ngx.stop();
        this.handleError(error);
      }
    });
  }

  processLivraisons(livraisons: any[]): void {
    this.livraisonsAConfirmer.data = livraisons.filter(l => l.statut === 'LIVREE');
    this.livraisonsEnCours.data = livraisons.filter(l => 
      l.statut === 'EN_ATTENTE' || l.statut === 'EN_COURS'
    );
    this.livraisonsTerminees.data = livraisons.filter(l => l.statut === 'CONFIRMEE');
  }

  confirmerLivraison(livraisonId: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '450px',
      data: {
        message: 'Confirmer la réception de cette livraison?',
        confirmation: true
      }
    });

    dialogRef.componentInstance.onEmitStatusChange.subscribe(() => {
      this.confirmLivraison(livraisonId);
      dialogRef.close();
    });
    
  }

  confirmLivraison(livraisonId: number): void {
    this.ngx.start();
    this.livraisonService.confirmerLivraison(livraisonId).subscribe({
      next: (response: any) => {
        this.ngx.stop();
        this.responseMessage = response?.message || 'Livraison confirmée avec succès';
        this.snackBar.openSnackBar(this.responseMessage, 'success');
        this.loadLivraisons();
      },
      error: (error) => {
        this.ngx.stop();
        this.handleError(error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.livraisonsAConfirmer.filter = filterValue.trim().toLowerCase();
    this.livraisonsEnCours.filter = filterValue.trim().toLowerCase();
    this.livraisonsTerminees.filter = filterValue.trim().toLowerCase();
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

  private handleError(error: any): void {
    console.error(error);
    this.ngx.stop();
    if (error.error?.message) {
      this.responseMessage = error.error.message;
    } else {
      this.responseMessage = GlobalConstant.genericError;
    }
    this.snackBar.openSnackBar(this.responseMessage, 'error');
  }
}
