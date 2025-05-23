import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LivraisonService } from '../Services/livraison.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-list-livraison-by-restau',
  standalone:false,
  templateUrl: './list-livraison-by-restau.component.html',
  styleUrls: ['./list-livraison-by-restau.component.css']
})
export class ListLivraisonByRestauComponent implements OnInit {
  displayedColumns: string[] = ['id', 'dateLivraison', 'statut', 'adresse', 'commandeClient', 'montant', 'nomLivreur'];
  dataSource = new MatTableDataSource<any>();
  restaurantId!: number;
  isLoading = true;
  errorMessage: string | null = null;

   monthlyRevenue: number = 0.0;
  yearlyRevenue: number = 0.0;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth() + 1; 

  constructor(
    private livraisonService: LivraisonService,
    private userAuth: AuthService
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.userAuth.getCurrentUserId()!;
    
    if (this.restaurantId) {
      this.loadLivraisonsByRestaurant(this.restaurantId);
    } else {
      this.errorMessage = "No restaurant ID available";
      this.isLoading = false;
    }
  }

  loadLivraisonsByRestaurant(restaurantId: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.livraisonService.getAllLivraisonsByRestaurant(restaurantId).subscribe({
      next: (response) => {
        this.dataSource.data = response;
         this.calculateRevenue(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading deliveries:', error);
        this.errorMessage = error.status === 404 
          ? 'Endpoint not found. Please check server configuration.'
          : 'Failed to load deliveries. Please try again later.';
        this.isLoading = false;
      }
    });
  }

    calculateRevenue(livraisons: any[]): void {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed
    
    this.monthlyRevenue = livraisons
      .filter(liv => {
        const livDate = new Date(liv.dateLivraison);
        return livDate.getFullYear() === currentYear && 
               livDate.getMonth() + 1 === currentMonth;
      })
      .reduce((sum, liv) => sum + (liv.montant || 0), 0);
    
    this.yearlyRevenue = livraisons
      .filter(liv => new Date(liv.dateLivraison).getFullYear() === currentYear)
      .reduce((sum, liv) => sum + (liv.montant || 0), 0);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}