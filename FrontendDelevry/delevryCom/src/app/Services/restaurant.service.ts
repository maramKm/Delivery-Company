import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRestau(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "/restaurant/GetRestau").pipe(
      map(restaurants => restaurants.map(restaurant => ({
        ...restaurant,
        status: this.convertToBoolean(restaurant.status)
      }))
    ));
  }

  changeStatus(data: {id: number, status: boolean}): Observable<string> {
    return this.http.put<string>(
      `${this.url}/restaurant/${data.id}/changerStatut`,
      { status: data.status },
      { 
        responseType: 'text' as 'json' 
      }
    );
  }

  private convertToBoolean(status: any): boolean {
    return status === true || status === 'true' || status === 1 || status === '1';
  }
}