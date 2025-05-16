import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  url = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getRestau(){
    return this.http.get(this.url+"/restaurant/GetRestau", {
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }


}
