import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlatService {
  url = environment.apiUrl;

  constructor(private http: HttpClient,
    private userService : AuthService
  ) {}

  // Step 1: Créer le plat, Step 2: uploader l'image
  addPlatWithImage(platData: any, image: File): Observable<any> {
    return this.http.post<any>(`${this.url}/plat/Add`, platData).pipe(
      switchMap((createdPlat) => {
        const formData = new FormData();
        formData.append('image', image);
        return this.http.post(`${this.url}/plat/${createdPlat.id}/upload-image`, formData);
      })
    );
  }
  getAllPlats(): Observable<any> {
    // Retrieve user data from localStorage
    const userData = this.userService.getUserData(); // Assuming you have the userService instance injected
  
    // Check if userData exists and extract restaurantId
    const restaurantId = userData ? userData.id : null;
  
    // If restaurantId is invalid, return an error observable
    if (!restaurantId || isNaN(restaurantId)) {
      console.error('Invalid restaurantId in localStorage.');
      return throwError(() => new Error('Invalid restaurantId. Please ensure you are logged in.'));
    }
  
    // Return the HTTP request to fetch plats for the specific restaurant
    return this.http.get(`${this.url}/plat/getPlatRestau/${restaurantId}`);
  }
  
  add(data: any) {
    return this.http.post(`${this.url}/plat/Add`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
  updatePlat(data: any) {
    return this.http.put(`${this.url}/plat/edit`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  getPlatsByRestaurant(idRestaurant:string){
    return this.http.get(`${this.url}/plat/getPlatRestau/${idRestaurant}`);
  }
  


}
