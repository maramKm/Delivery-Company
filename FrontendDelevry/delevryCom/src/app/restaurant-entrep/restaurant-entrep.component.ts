import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../Services/snackbar.service';
import { RestaurantService } from '../Services/restaurant.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstant } from '../shared/globalConstant';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-restaurant-entrep',
  standalone:false,
  templateUrl: './restaurant-entrep.component.html',
  styleUrls: ['./restaurant-entrep.component.css']
})
export class RestaurantEntrepComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'contact', 'status'];
  dataSource = new MatTableDataSource<any>();
  loadingStates: { [id: number]: boolean } = {};

  constructor(
    private restaurantService: RestaurantService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestau().subscribe({
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

  onStatusChange(event: MatSlideToggleChange, restaurantId: number): void {
    const newStatus = event.checked;
    this.loadingStates[restaurantId] = true;

    this.restaurantService.changeStatus({ id: restaurantId, status: newStatus })
      .subscribe({
        next: () => {
          this.loadingStates[restaurantId] = false;
          this.snackbarService.openSnackBar(
            `Restaurant ${newStatus ? 'activated' : 'deactivated'} successfully`,
            'success'
          );
        },
        error: () => {
          this.loadingStates[restaurantId] = false;
          this.snackbarService.openSnackBar(
            'Error updating restaurant status',
            'error'
          );
          // Revert the toggle on error
          this.dataSource.data = this.dataSource.data.map(item => {
            if (item.id === restaurantId) {
              return { ...item, statut: !newStatus };
            }
            return item;
          });
        }
      });
  }
}