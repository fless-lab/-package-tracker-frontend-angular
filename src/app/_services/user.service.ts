import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(role?: string) {
      let url = `${environment.apiUrl}/api/users`;

      if (role) {
        url += `?role=${role}`;
      }
      return this.http.get<{ success: boolean, users?: User[], error?: any }>(url);
    }

    getById(id: number) {
        return this.http.get<{ success: boolean, user?: User, error?: any }>(`${environment.apiUrl}/api/users/${id}`);
    }
}
