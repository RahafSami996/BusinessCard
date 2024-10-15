import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessCard } from './models/business-card.model'; // create this model according to your backend structure
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BusinessCardService {
    private apiUrl = environment.apiUrl; // Update with your API URL

    constructor(private http: HttpClient) {}

    getBusinessCards() {
        return this.http.get(`${this.apiUrl}/businesscard`);
      }
    
      createBusinessCard(cardData: any) {
        return this.http.post(`${this.apiUrl}/businesscard`, cardData);
      }
    
      deleteBusinessCard(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/businesscard${id}`);
      }
}