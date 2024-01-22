import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '@app/_services';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html'
})
export class TrackerComponent implements OnInit {
  deliveryId: string = '';
  delivery: any;

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
  }

  async searchDelivery() {
    try {
      const result = await this.deliveryService.getDelivery(this.deliveryId).toPromise();
      console.log("result : ",result)
      this.delivery = result?.delivery;
    } catch (error) {
      console.error('Error searching for delivery:', error);
    }
  }
}
