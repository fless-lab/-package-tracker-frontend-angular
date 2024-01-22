import { Component } from '@angular/core';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: User | null;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    get isAdmin() {
        return this.user?.role === Role.Admin;
    }

    get isDriver() {
      return this.user?.role === Role.Driver;
  }

  get isCustomer() {
    return this.user?.role === Role.User;
}

    logout() {
        this.authenticationService.logout();
    }
}
