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

 anuuler(orderId: number): Observable<string> {
  return this.http.put<string>(
    `${this.url}/commande/${orderId}/annuler`, 
    null,  // No request body needed
    { responseType: 'text' as 'json' }  // To properly handle string response
  );
}
  
  getCommandeDetails(commandeId: number): Observable<any> {
  return this.http.get(`${this.url}/commande/details/${commandeId}`);
}


  getAllCommandeByRestaurant(commandeId : number): Observable<any> {
  return this.http.get(`${this.url}/commande/restaurant/${commandeId}`);
}

 preparerStatus(commandeId:number): Observable<string> {
  return this.http.put<string>(
    `${this.url}/commande/${commandeId}/changerStatut`, 
    null,  // No request body needed
    { responseType: 'text' as 'json' }  // To properly handle string response
  );
} 
PretStatus(commandeId:number): Observable<string> {
  return this.http.put<string>(
    `${this.url}/commande/${commandeId}/pret`, 
    null,  // No request body needed
    { responseType: 'text' as 'json' }  // To properly handle string response
  );
} 

}
