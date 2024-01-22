import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  constructor(private http: HttpClient) { }

  getAllPackages(): Observable<{ success: boolean, packages?: any[], error?: any }> {
    return this.http.get<{ success: boolean, packages?: any[], error?: any }>(`${environment.apiUrl}/api/packages`);
  }

  getPackage(id: number): Observable<{ success: boolean, packages?: any, error?: any }> {
    return this.http.get<{ success: boolean, package?: any, error?: any }>(`${environment.apiUrl}/api/packages/${id}`);
  }

  createPackage(packageData: any): Observable<{ success: boolean, error?: any }> {
    return this.http.post<{ success: boolean, error?: any }>(`${environment.apiUrl}/api/packages`, packageData);
  }
}
