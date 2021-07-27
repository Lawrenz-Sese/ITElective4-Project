import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "src/app/service/data.service";
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalController } from '@ionic/angular';
import { CartCheckoutPage } from '../cart-checkout/cart-checkout.page';
import { EventTriggerService } from '../service/eventTrigger/event-trigger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  //variables 
  
  total = 0;
  cart: any;
  currentItems: any;
  cartinfo: any = {};
  cartTotal: number;
  totalamount: number;
  counterTotal: number;
  totalamounts: any;
  delivery: number;
  cartlength: any;
  cartCounter: number;
  user_Id: any;
  prodInfo: any;
  checkInfo: any = {};
  code: string;

  clickEvent: Subscription;

  constructor( private ev: EventTriggerService, private router: Router, private ds: DataService, private modalCtrl: ModalController) {
    this.clickEvent = this.ev.getClickEvent().subscribe(()=>{
      this.pullCart();
    })
  }
  

  @ViewChild('content') callAPIDialog: TemplateRef<any>;

  ngOnInit() {
    this.pullCart();
  }

  // Function that will serve as trigger to open a modal and pass the data
  async openModal(cart) {
    const modal = await this.modalCtrl.create({
      component: CartCheckoutPage,
      componentProps: {
        cart: cart.cart_id,
        cartdesc: cart.cart_pdesc,
        name: cart.cart_pname,
        quant: cart.cart_pquant
      }
    });
    await modal.present();
  }

  // Function that will pull all your cart items from database depends on logged in user
  pullCart() {
      this.cartinfo.user_Id = localStorage.getItem("id");
      this.ds.sendApiRequest("cart",localStorage.getItem("id")).subscribe(data => {
      this.cart = data.payload;
      this.getTotal();

      // Cart Counter 
      for (let i = 0; i <= this.cart.length; i++) {
        this.cartCounter = i;
      }
    })
  }
 // Function that will compute the total amount inside the cart items
  getTotal() {
    let total = 0;
    for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].cart_pquant) {
          // get total amount of the products inside the cart items
            total += this.cart[i].cart_pquant;
            this.totalamount = total;
          
            //total expenses 
            this.totalamounts = Math.round(this.delivery + total);

            // delivery charge  = 50 

            this.delivery = this.cart.length * 3 + 50;
        }   
    }
    return total;
  }

  // Function that will delete the item on cart list 
  async delCarts(e) {
    this.cartinfo.cart_id = e;

        this.ds.sendApiRequest("delCarts", JSON.parse(JSON.stringify(this.cartinfo))).subscribe(data => {
          this.pullCart();
          this.ev.sendClickEvent();
        });
  }

  openCheckout(){
    this.router.navigate(['/cart-checkout']);
  }

 
  pname: any;
  pdesc: any;
  pquant: any;

  addCheck = (cart) => {

    
    this.checkInfo.cart_id = cart.cart_id;
    this.checkInfo.check_pname = cart.cart_pname;
    this.checkInfo.check_pquant = cart.cart_pquant;
    this.checkInfo.image = cart.image;

    // Generate a 5 digit random number
    var seq = (Math.floor(100000 + Math.random() * 900000)).toString().substring(1);
    this.code = seq;
    this.checkInfo.check_code = this.code;

    this.checkInfo.user_id = localStorage.getItem("id");

    Swal.fire({
      title: 'Checkout Item?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      backdrop: false
    }).then((result) => {
      if (result.isConfirmed) {

    this.ds.sendApiRequest("addCheck", JSON.parse(JSON.stringify(this.checkInfo))).subscribe(data => {
      // this.pullProducts();
      this.pullCart();
      this.delCarts(this.checkInfo.cart_id);
      this.ev.sendClickEvent();
    });
    Swal.fire({
      icon: 'success',
      text: 'Checkout successfuly!'
    })
  }
})
    this.router.navigate(['/cart'])
    }
}
