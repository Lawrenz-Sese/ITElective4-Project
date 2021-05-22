import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from "src/app/service/data.service";


@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.page.html',
  styleUrls: ['./cart-checkout.page.scss'],
})
export class CartCheckoutPage implements OnInit {
  //  Values that will show in frontend
  @Input() cart: any;
  @Input() cartdesc: any;
  @Input() name: any;
  @Input() quant: any;
  userInfo: any = {};
  users: any;
  totalAmount: any;
  total: number;



  constructor( private modalCtrl:ModalController, private ds: DataService) { }

// Exit Modal
  dismissModal(){
    this.modalCtrl.dismiss();
 }

  ngOnInit( ) {
    this.pullUsers();
  }

  pullUsers() {
    this.userInfo.user_Id = localStorage.getItem("id");
      console.log(this.userInfo);
      this.ds.sendApiRequest("users",localStorage.getItem("id")).subscribe(data => {
       
      this.users = data.payload;

    console.log(this.users);
  })
}



}
