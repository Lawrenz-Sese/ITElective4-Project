import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { DataService } from "src/app/service/data.service";
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalController } from '@ionic/angular';
import { CartCheckoutPage } from '../cart-checkout/cart-checkout.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  selectedItems = [];
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
  constructor(private router: Router, private ds: DataService, private modalCtrl: ModalController) {

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
        quant: cart.cart_pquant,
      }
    });
    console.log(cart);
    await modal.present();
  }

  // Function that will pull all your cart items from data base
  pullCart() {
    this.ds.sendApiRequest("cart", null).subscribe(data => {
      this.cart = data.payload;
      console.log(this.cart);
      this.getTotal();

      for (let i = 0; i <= this.cart.length; i++) {
        this.cartCounter = i;
      }
    })
  }
 
  getTotal() {
    let total = 0;
    for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].cart_pquant) {
            total += this.cart[i].cart_pquant;
            this.totalamount = total;
            this.totalamounts = Math.round(this.delivery + total);
            this.delivery = this.cart.length * 3 + 50;
        }   
    }
    return total;

}

  // Function that will delete the item on cart list 
  async delCarts(e) {
    this.cartinfo.cart_id = e;
    Swal.fire({
      title: 'Remove item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.sendApiRequest("delCarts", JSON.parse(JSON.stringify(this.cartinfo))).subscribe(data => {
          this.pullCart();
        });
        Swal.fire(
          'Deleted!',
          'Item has been removed.',
          'success'
        )
      }
    })
  }
}