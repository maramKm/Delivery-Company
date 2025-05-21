import { Component } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommandeService } from '../Services/commande.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

interface CartItem {
  id: number;
  nom: string;
  description: string;
  prix: string;
  restaurantId: number;
  quantity: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone:false
})
export class CardComponent {
  cartItems: CartItem[] = [];
  total: number = 0;
  deliveryAddress: string = '';
  isSubmitting: boolean = false;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private commandeService: CommandeService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateCartItem(item.id.toString(), newQuantity);
      this.loadCart();
    }
  }
  removeItem(item: CartItem): void {
    this.cartService.updateCartItem(item.id, 0); // item.id est déjà un nombre
    this.loadCart();
  }
  
  
  

  validateSingleRestaurant(): boolean {
    if (this.cartItems.length === 0) return true;
    
    const firstRestaurantId = this.cartItems[0].restaurantId;
    return this.cartItems.every(item => item.restaurantId === firstRestaurantId);
  }

  confirmOrder(): void {
    if (this.cartItems.length === 0) {
      this.snackBar.open('Your cart is empty', 'OK', { duration: 3000 });
      return;
    }
  
    if (!this.validateSingleRestaurant()) {
      this.snackBar.open('Please order from one restaurant at a time', 'OK', { duration: 3000 });
      return;
    }
  
    if (!this.deliveryAddress) {
      this.snackBar.open('Please enter a delivery address', 'OK', { duration: 3000 });
      return;
    }
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Confirm Order',
      confirmation: true
    };
  
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
  
    // Listen to EventEmitter
    dialogRef.componentInstance.onEmitStatusChange.subscribe(() => {
      this.submitOrder(); // Proceed with order
      dialogRef.close(); // Optional: close dialog manually
    });
  }
  
  private submitOrder(): void {
    this.isSubmitting = true;
    const userData = this.authService.getUserData();
    console.log(userData); 
    if (!userData?.id) {
      this.snackBar.open('Please login to place an order', 'OK', { duration: 3000 });
      this.isSubmitting = false;
      return;
    }

    const restaurantId = this.cartItems[0].restaurantId;
   const plats = this.cartItems.map(item => ({
  id: item.id,
  quantite: item.quantity
}));

    const orderData = {
      clientId: userData.id,
      restaurantId: restaurantId,
      plats: plats,
      adresseLivraison: this.deliveryAddress,
      montant: this.total,
    };
    console.log(orderData);

    this.commandeService.createCommande(orderData).subscribe({
      next: () => {
        this.snackBar.open('Order placed successfully!', 'OK', { duration: 3000 });
        this.cartService.clearCart();
        this.router.navigate(['delevry/commande']);
      },
      error: (error) => {
        console.error('Order error:', error);
        this.snackBar.open('Failed to place order. Please try again.', 'OK', { duration: 3000 });
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}