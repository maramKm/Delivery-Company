import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../Services/snackbar.service';
import { UserService } from '../Services/user.service';
import { RestaurantService } from '../Services/restaurant.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstant } from '../shared/globalConstant';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-restaurant-entrep',
  standalone: false,
  templateUrl: './restaurant-entrep.component.html',
  styleUrl: './restaurant-entrep.component.css'
})
export class RestaurantEntrepComponent implements OnInit {
 displayedColumns: string[] = ['name', 'email', 'contactNumber', 'status'];
  dataSource!: MatTableDataSource<any>;
  responseMessage: any;
  loadingStates: { [id: number]: boolean } = {};

  constructor(
    private restauservice: RestaurantService,
    private ngxService: NgxUiLoaderService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

tableData() {
  this.restauservice.getRestau().subscribe(
    (response: any) => {
      this.ngxService.stop();
      // Convertir explicitement status en booléen pour chaque restaurant
      const processedData = response.map((restaurant: any) => ({
        ...restaurant,
        status: Boolean(restaurant.status)  // Force la conversion en booléen
      }));
      this.dataSource = new MatTableDataSource(processedData);
    },
    (error: any) => {
      this.ngxService.stop();
      console.log(error.error?.message);
      this.responseMessage = error.error?.message || GlobalConstant.genericError;
      this.snackBar.openSnackBar(this.responseMessage, 'error');
    }
  );
}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onStatusChange(event: MatSlideToggleChange, restaurantId: number) {
    const newStatus = event.checked;
    this.loadingStates[restaurantId] = true;
    
    // Optimistic UI update
    const restaurant = this.dataSource.data.find(r => r.id === restaurantId);
    if (restaurant) {
      restaurant.status = newStatus;
    }

    this.restauservice.changeStatus({
      id: restaurantId,
      status: newStatus
    }).subscribe({
      next: (response) => {
        this.loadingStates[restaurantId] = false;
        this.snackBar.openSnackBar(
          `Restaurant ${newStatus ? 'activated' : 'deactivated'} successfully`,
          'success'
        );
      },
      error: (error) => {
        this.loadingStates[restaurantId] = false;
        // Revert on error
        if (restaurant) {
          restaurant.status = !newStatus;
        }
        this.snackBar.openSnackBar(
          'Failed to update restaurant status',
          'error'
        );
      }
    });
  }

  // Helper method to revert toggle state
  private revertToggle(restaurantId: number) {
    const restaurant = this.dataSource.data.find(r => r.id === restaurantId);
    if (restaurant) {
      restaurant.status = !restaurant.status;
      this.dataSource.data = [...this.dataSource.data]; // Trigger change detection
    }
  }
}