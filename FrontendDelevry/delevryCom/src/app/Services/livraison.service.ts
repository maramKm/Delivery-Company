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
    let errorMessage = 'Failed to assign delivery person';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Invalid request data';
          break;
        case 404:
          errorMessage = 'Endpoint not found';
          break;
        case 500:
          errorMessage = error.error?.message || 'Server error occurred';
          break;
        default:
          errorMessage = `Server returned ${error.status}: ${error.message}`;
      }    }
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
affecterLivreur(livraisonId: number, livreurId: number): Observable<any> {
  const payload = {
    commandeId: livraisonId, // OK si ton backend attend "commandeId"
    livreurId: livreurId
  };

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}`
  });

  return this.http.post(
    `${this.apiUrl}/livraison/affecter`,
    payload,
    {
      headers,
      responseType: 'text' // 👈 Indique qu'on attend du texte, pas du JSON
    }
  ).pipe(
    catchError(this.handleError)
  );
}

private getToken(): string {
    // Implement your actual token retrieval
    return localStorage.getItem('auth_token') || '';
  }
  // Mark delivery as completed
marquerCommeLivree(livraisonId: number): Observable<{ success: boolean, message: string }> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}`
  });

  return this.http.post(
    `${this.apiUrl}/livraison/marquer-livree/${livraisonId}`,
    {},
    { 
      headers,
      responseType: 'text'  // ← Handle plain text response
    }
  ).pipe(
    map((response: string) => {
  const success = response.includes('succès'); // ou 'success' selon ton message
  return {
    success,
    message: response
  };
})
,
    catchError(this.handleError)
  );
}

  // Confirm delivery
  confirmerLivraison(livraisonId: number): Observable<{ success: boolean, message: string }> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}`
  });

  return this.http.post(
    `${this.apiUrl}/livraison/confirmer/${livraisonId}`,
    {},
    { 
      headers,
      responseType: 'text'  // Add if backend returns raw boolean
    }
  ).pipe(
    map((response: string) => {
    const success = response.includes('succès'); // ou 'success' si message anglais
    return {
      success,
      message: response
    };
    }),
    catchError(this.handleError)
  );
}
  
  // Accept delivery
// In LivraisonService
accepterLivraison(data: any): Observable<{ success: boolean, message: string }> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}`
  });

  return this.http.post(
    `${this.apiUrl}/livraison/accepter`,
    data,
    { 
      headers,
      responseType: 'text'  // ← Key change: expect text, not JSON
    }
  ).pipe(
    map((response: string) => {
      // Convert string 'true'/'false' to boolean
      const success = response.toLowerCase() === 'true';
      return {
        success,
        message: success ? 'Delivery accepted' : 'Failed to accept delivery'
      };
    }),
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