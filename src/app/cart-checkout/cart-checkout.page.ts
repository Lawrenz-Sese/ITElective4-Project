import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { DataService } from "src/app/service/data.service";
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.page.html',
  styleUrls: ['./cart-checkout.page.scss'],
})
export class CartCheckoutPage implements OnInit {



  @Input() codes: any;
  @Input() dates: any;
  @Input() name: any;
  @Input() desc: any;
  @Input() quant: any;





  constructor( private modalCtrl:ModalController, private ds: DataService) { }

// Exit Modal
  dismissModal(){
    this.modalCtrl.dismiss();
 }

  ngOnInit( ) {
    
  }







}
