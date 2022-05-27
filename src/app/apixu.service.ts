import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  

  constructor(private http: HttpClient) { }
  getWeather(location: string){

   
    return this.http.get(
        'http://api.weatherstack.com/current?access_key=f40161a791a7fb7541324c7b75df7f8f&query=' + location,
  
    );
  }
}
