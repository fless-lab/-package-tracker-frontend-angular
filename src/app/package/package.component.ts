// package.module.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Role, User } from '@app/_models';
import { AuthenticationService, PackageService, UserService } from '@app/_services';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html'
})
export class PackageComponent implements OnInit {
  packages: any[] = [];
  isAdmin: Boolean = false;
  users: User[] = [];
  @ViewChild('shippingForm') shippingForm : NgForm | undefined;
  shippingData = {
    description: '',
    weight: null,
    width: null,
    height: null,
    depth: null,
    from_name: '',
    from_address: '',
    from_location: { lat: null, lng: null },
    to_name: '',
    to_address: '',
    to_location: { lat: null, lng: null },
    customer: ''  // Ajoutez le champ customer ici
  };

  constructor(
    private packageService: PackageService,
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getPackages();

    // Écoutez les changements de l'utilisateur
    this.authService.user.subscribe(user => {
      console.log("user : ",user);
      // Mettez à jour votre logique en fonction des changements d'utilisateur
      // Par exemple, mettez à jour le champ customer dans shippingData
      this.shippingData.customer = `${user?.id}`;
      this.isAdmin = user?.role === Role.Admin;

      if(this.isAdmin){
        this.getUsers();
      }
    });
  }

  async getUsers() {
    try {
      const response = await this.userService.getAll(Role.User).toPromise();
      this.users = response?.users || [];
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async getPackages() {
    try {
      const response = await this.packageService.getAllPackages().toPromise();
      this.packages = response?.packages || [];
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  }



  async onSubmit() {
    try {
      await this.packageService.createPackage(this.shippingData).toPromise();
      this.getPackages();
      this.shippingForm?.reset();;
    } catch (error) {
      console.error('Error creating package:', error);
    }
  }
}
