import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {
  url = environment.apiUrl

  constructor(private httpClient:HttpClient) {
   }

   getDetails(): Observable<any> {
    return this.httpClient.get<any>(this.url + "/dashboard/details", {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      catchError((error) => {
        // Handle the error appropriately here
        console.error('Error fetching details:', error);
        return throwError(() => new Error('Failed to fetch details.'));
      })
    );
  }
  
}
