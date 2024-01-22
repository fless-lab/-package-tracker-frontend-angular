import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  constructor(private http: HttpClient) { }

  getAllDeliveries(): Observable<{ success: boolean, deliveries?: any[], error?: any }> {
    return this.http.get<{ success: boolean, deliveries?: any[], error?: any }>(`${environment.apiUrl}/api/deliveries`);
  }

  getDelivery(id: string): Observable<{ success: boolean, delivery?: any, error?: any }> {
    return this.http.get<{ success: boolean, delivery?: any, error?: any }>(`${environment.apiUrl}/api/deliveries/${id}`);
  }

  createDelivery(deliveryData: any): Observable<{ success: boolean, error?: any }> {
    return this.http.post<{ success: boolean, error?: any }>(`${environment.apiUrl}/api/deliveries`, deliveryData);
  }
}
