import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


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



  constructor( private modalCtrl:ModalController) { }

// Exit Modal
  dismissModal(){
    this.modalCtrl.dismiss();
 }

  ngOnInit( ) {
  }



}
