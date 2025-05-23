import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Livraison } from '../shared/Livraison';
import { Livreur } from '../shared/Livreur';


@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Improved with proper typing and error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Get available delivery persons
  getLivreursDisponibles(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(`${this.apiUrl}/livraison/livreurs-disponibles`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get pending deliveries
  getLivraisonsEnAttente(): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(`${this.apiUrl}/livraison/commandes-preparees`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get deliveries for a specific delivery person
  getLivraisonsLivreur(livreurId: number): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(`${this.apiUrl}/livraison/livreur/${livreurId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Assign delivery person to a delivery
  affecterLivreur(livraisonId: number, livreurId: number): Observable<Livraison> {
    const data = {
      commandeId: livraisonId,
      livreurId: livreurId
    };

    return this.http.post<any>(`${this.apiUrl}/livraison/affecter`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Mark delivery as completed
  marquerCommeLivree(livraisonId: number): Observable<Livraison> {
    return this.http.post<any>(
      `${this.apiUrl}/livraison/marquer-livree/${livraisonId}`, 
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Confirm delivery
  confirmerLivraison(livraisonId: number): Observable<Livraison> {
    return this.http.post<any>(
      `${this.apiUrl}/livraison/confirmer/${livraisonId}`, 
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }
  
  // Accept delivery
  accepterLivraison(data: any): Observable<Livraison> {
    return this.http.post<any>(
      `${this.apiUrl}/livraison/accepter`, 
      data
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Get deliveries for a specific client
  getLivraisonsClient(clientId: number): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(`${this.apiUrl}/livraison/client/${clientId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

    getAllLivreur(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/livraison/livreurs`)
      .pipe(
        catchError(this.handleError)
      );
  }

     getAllLivraison(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/livraison/AllLivraison`)
      .pipe(
        catchError(this.handleError)
      );
  }

    getAllLivraisonsByRestaurant(restaurantId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/livraison/AllLivraisonByRestaurant/${restaurantId}`);
  }

}