import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  sendGET(url: string, headers?: HttpHeaders) {
    return this.http.get(url, { headers: headers, observe: 'response' });
  }

  sendPOST(url: string, headers?: HttpHeaders, body?: any) {
    return this.http.post(url, body, { headers, observe: 'response' });
  }

  sendPUT(url: string, headers?: HttpHeaders, body?: any) {
    return this.http.put(url, body, { headers, observe: 'response' });
  }

  sendDELETE(url: string, headers?: HttpHeaders) {
    return this.http.delete(url, { headers, observe: 'response' });
  }
}
