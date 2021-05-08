import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) {}

  apiURL = "http://localhost/itelective4-project/api/";

  sendApiRequest(method, data) {
    return <any>(
      this.http.post(this.apiURL + method, btoa(JSON.stringify(data)))
    );
  }
}
