import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getRestau(){
    return this.http.get(this.url+"/restaurant/GetRestau")
  }

 changeStatus(data: {id: number, status: boolean}): Observable<string> {
  return this.http.put<string>(
    `${this.url}/restaurant/${data.id}/changerStatut`,
    { status: data.status },  // Send as proper JSON object
    { 
      responseType: 'text' as 'json' 
    }
  );
}
}
