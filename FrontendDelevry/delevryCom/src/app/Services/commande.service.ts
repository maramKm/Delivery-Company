import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Commande } from '../shared/commmande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  url=environment.apiUrl

  constructor(private http : HttpClient) { }
  createCommande(data:any){
    return this.http.post(`${this.url}/commande/add`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


  getCommandesByClient(clientId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.url}/commande/client/${clientId}`);
  }
  
  modifierCommande(commandeId: number, data: any): Observable<string> {
    return this.http.put<string>(`${this.url}/commande/${commandeId}/modifier`, data);
  }

  annuler(clientId: number, body: any): Observable<any> {
    return this.http.put(`${this.url}/commande/${clientId}/annuler`, body);
  }
  
  getCommandesByStatutsAndRestaurant(statuts: string[], restaurantId: number): Observable<Commande[]> {
    const statutParams = statuts.map(s => `statut=${encodeURIComponent(s)}`).join('&');
    return this.http.get<Commande[]>(`${this.url}/commande?${statutParams}&restaurantId=${restaurantId}`);
  }

  notifyLivreursDisponibles(commandeId: number): Observable<any> {
    return this.http.post(`${this.url}/commande/${commandeId}/notify-livreurs`, {});
  }
  
  

}
