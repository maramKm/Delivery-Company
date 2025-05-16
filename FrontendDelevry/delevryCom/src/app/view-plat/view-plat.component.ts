import { Component, OnInit } from '@angular/core';
import { PlatService } from '../Services/plat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../Services/snackbar.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-view-plat',
  standalone: false,
  templateUrl: './view-plat.component.html',
  styleUrl: './view-plat.component.css'
})
export class ViewPlatComponent implements OnInit {
  idRestaurant: string = '';
  plats: any[] = [];

  constructor(
    private platService: PlatService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar :SnackbarService,
    private cartService:CartService 
  ) {}

  ngOnInit(): void {
    this.idRestaurant = this.route.snapshot.paramMap.get('restaurantId') || '';
    if (this.idRestaurant) {
      this.loadPlats();
      console.log('Restaurant ID:', this.idRestaurant);
    } else {
      console.error('No restaurant ID provided');
      console.log('Restaurant ID:', this.idRestaurant);
      // Optionally redirect back
      this.router.navigate(['/delevry/homeManage']);
    }
  }

  loadPlats() {
    this.platService.getPlatsByRestaurant(this.idRestaurant).subscribe(
      (response: any) => {
        this.plats = response;
        console.log('Plats loaded:', this.plats); // Debug log
      },
      (error) => {
        console.error('Error loading plats:', error);
        // Handle error (show message, redirect, etc.)
      }
    );
  }
  // Add to your view-plat.component.ts
goBack() {
  this.router.navigate(['/delevry/homeManage']);
}

orderNow(plat: any) {
  this.cartService.addToCart(plat);
  this.snackbar.openSnackBar(`${plat.nom} added to cart!`)
}
  

}
