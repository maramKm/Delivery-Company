import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LivraisonService } from '../Services/livraison.service';
import { SnackbarService } from '../Services/snackbar.service';
import { GlobalConstant } from '../shared/globalConstant';
import { Livreur } from '../shared/Livreur';

@Component({
  selector: 'app-list-livreur',
  standalone: false,
  templateUrl: './list-livreur.component.html',
  styleUrl: './list-livreur.component.css'
})
export class ListLivreurComponent {
    displayedColumns: string[] = ['id', 'nom', 'prenom', 'matricule', 'dispo'];
  dataSource = new MatTableDataSource<Livreur>();
  loadingStates: { [id: number]: boolean } = {};

  constructor(
    private livraisonService: LivraisonService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.loadLivreurs();
  }

  loadLivreurs(): void {
    this.livraisonService.getAllLivreur().subscribe({
      next: (response:any) => {
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
