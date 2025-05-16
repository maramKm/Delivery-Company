import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'restaurant_cart';

  addToCart(plat: any): void {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === plat.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...plat, quantity: 1 });
    }
    
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  getCart(): any[] {
    const cartJson = localStorage.getItem(this.cartKey);
    return cartJson ? JSON.parse(cartJson) : [];
  }

  updateCartItem(id: string | number, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find(i => i.id === +id); // +id convertit en number  
  
    if (item) {
      if (quantity > 0) {
        item.quantity = quantity;
      } else {
        cart.splice(cart.indexOf(item), 1); // Supprime l'article si la quantité est 0
      }
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }
  }
  


  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  getTotal(): number {
    return this.getCart().reduce(
      (sum, item) => sum + (+item.prix * item.quantity), 0 // Utilisation de + pour convertir item.prix en number
    );
  }
  
}
