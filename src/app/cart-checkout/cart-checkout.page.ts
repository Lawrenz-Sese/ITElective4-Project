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
  //  Values that will show in frontend

  userInfo: any = {};
  users: any;
  totalAmount: any;
  total: number;
  cartinfo: any = {};
  user_Id: any;
  totalamount: number;
  totalamounts: number;
  delivery: number;
  checkInfo: any = {};
  cart: any;
  code: string;






  constructor( private modalCtrl:ModalController, private ds: DataService) { }

// Exit Modal
  dismissModal(){
    this.modalCtrl.dismiss();
 }

  ngOnInit( ) {
    this.pullUsers();
    this.pullCart();
  }

  pullUsers() {
    this.userInfo.user_Id = localStorage.getItem("id");
      // console.log(this.userInfo);
      this.ds.sendApiRequest("users",localStorage.getItem("id")).subscribe(data => {
       
      this.users = data.payload;

    // console.log(this.users);
  })
}

pullCart() {

  this.cartinfo.user_Id = localStorage.getItem("id");
  // console.log(this.cartinfo);
  this.ds.sendApiRequest("cart",localStorage.getItem("id")).subscribe(data => {
   
  this.cart = data.payload;

  // console.log(this.cart);
     this.getTotal();

  // for (let i = 0; i <= this.cart.length; i++) {
  //   this.cartCounter = i;
  // }
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

// generateCode(){
//   Math.random() * (10 - 7 + 1) + 7;


//   console.log(Math.random());
// }


  min = 1;
  max = 9

 generateCode() {
  var seq = (Math.floor(100000 + Math.random() * 900000)).toString().substring(1);

  this.code = seq;
  console.log(this.code);
}

cart_pdesc: any;
cart_pname: any;
cart_pquant:any;

addCheck  = (cart) => {
    
  this.checkInfo.check_pdesc = cart.cart_pdesc;
  this.checkInfo.check_pname = cart.cart_pname ;
  this.checkInfo.check_pquant = cart.cart_pquant;
  this.checkInfo.check_totalamounts = this.totalamounts;

  var seq = (Math.floor(100000 + Math.random() * 900000)).toString().substring(1);
  this.code = seq;
  this.checkInfo.check_code = this.code;

  this.checkInfo.user_id = localStorage.getItem("id");
  this.checkInfo.user_names = localStorage.getItem("Fullname");
  this.checkInfo.user_contact = localStorage.getItem("contact");
  // this.checkInfo.user_email = localStorage.getItem("email");
  this.checkInfo.user_address = localStorage.getItem("address");


  
  


   this.ds.sendApiRequest("addCheck", JSON.parse(JSON.stringify(this.checkInfo))).subscribe(data => {
  //   // this.pullProducts();
  //   // this.pullCart();
   });
  console.log(this.checkInfo);

  Swal.fire({
    icon: 'success',
    text: 'Successfuly Added!',
  })

  // this.router.navigate(['/cart'])

}



}
