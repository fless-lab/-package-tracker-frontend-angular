import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Role, User } from '@app/_models';
import { AuthenticationService, DeliveryService, PackageService, UserService } from '@app/_services';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit {
  deliveries: any[] = [];
  isAdmin: boolean = false;
  packages: any[] = [];
  drivers: User[] = [];
  @ViewChild('deliveryForm') deliveryForm: NgForm | undefined;
  deliveryData = {
    package: '',
    driver: ''
  };

  constructor(
    private deliveryService: DeliveryService,
    private authService: AuthenticationService,
    private packageService: PackageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getDeliveries();

    // Écoutez les changements de l'utilisateur
    this.authService.user.subscribe(user => {
      this.isAdmin = user?.role === Role.Admin;

      if (this.isAdmin) {
        this.getPackages();
        this.getDrivers();
      }
    });
  }

  async getPackages() {
    try {
      const response = await this.packageService.getAllPackages().toPromise();
      this.packages = response?.packages || [];
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  }

  async getDrivers() {
    try {
      const response = await this.userService.getAll(Role.Driver).toPromise();
      this.drivers = response?.users || [];
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  }

  async getDeliveries() {
    try {
      const response = await this.deliveryService.getAllDeliveries().toPromise();
      this.deliveries = response?.deliveries || [];
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  }

  async onSubmit() {
    try {
      await this.deliveryService.createDelivery(this.deliveryData).toPromise();
      this.getDeliveries();
      this.deliveryForm?.reset();
    } catch (error) {
      console.error('Error creating delivery:', error);
    }
  }
}
