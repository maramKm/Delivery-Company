import { Injectable } from "@angular/core";

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  role: string[];
}

const MENUITEMS: Menu[] = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard', role: ['ENTREPRISE' ]},
  { state: 'platManage', name: 'Manage Dishes', type: 'link', icon: 'restaurant', role: ['RESTAURANT'] },
  { state: 'homeManage', name: 'Home', type: 'link', icon: 'home', role: ['CLIENT']},
  { state: 'cart', name: 'Cart', type: 'link', icon: 'shopping_cart', role: ['CLIENT']},
  { state: 'commande', name: 'Order', type: 'link', icon: 'assignment',  role: ['CLIENT', 'RESTAURANT']} ,
  { state: 'restaurantManage', name: 'Manage Restaurants', type: 'link', icon: 'restaurant', role: ['ENTREPRISE']},
  { state: 'AssignDelvry', name: 'Assign Delvry', type: 'link', icon: 'delevry', role: ['ENTREPRISE']},
   { state: 'livreur', name: ' Delvry', type: 'link', icon: 'delevry', role: ['LIVREUR']},
  { state: 'client', name: ' Delvry', type: 'link', icon: 'delevry', role: ['CLIENT']},
   { state: 'GetLivreur', name: 'Delevry Person', type: 'link', icon: 'people', role: ['ENTREPRISE']},
  { state: 'GetLivraison', name: 'Delevries', type: 'link', icon: 'people', role: ['ENTREPRISE']},
      { state: 'GetLivraisonByRestau', name: 'Delevries', type: 'link', icon: 'people', role: ['RESTAURANT']},
];

@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
    return MENUITEMS;
  }
}
