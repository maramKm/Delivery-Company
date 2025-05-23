import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LivraisonService } from '../Services/livraison.service';
import { GlobalConstant } from '../shared/globalConstant';
import { SnackbarService } from '../Services/snackbar.service';

@Component({
  selector: 'app-list-delevry',
  standalone:false,
  templateUrl: './list-delevry.component.html',
  styleUrls: ['./list-delevry.component.css']
})
export class ListDelevryComponent {
  displayedColumns: string[] = ['id', 'dateLivraison', 'statut', 'adresse', 'commandeClient', 'commandeRestaurant', 'montant', 'nomLivreur'];
  dataSource = new MatTableDataSource<any>();
  loadingStates: { [id: number]: boolean } = {};

  constructor(
    private livraisonService: LivraisonService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.loadLivraisons();
  }

  loadLivraisons(): void {
    this.livraisonService.getAllLivraison().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dataSource.data = response;
      },
      error: (error) => {
        this.ngxService.stop();
        const message = error.error?.message || GlobalConstant.genericError;
        this.snackbarService.openSnackBar(message, 'error');
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}