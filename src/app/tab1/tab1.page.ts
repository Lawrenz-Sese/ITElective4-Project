import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { DataService } from "src/app/service/data.service";
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Configuration of slider
  sliderConfig = {
    spaceBetween: 7,
    centeredSlides: true,
    slidesPerView: 1.2
  }


  cart: any;
  productsCounter: number;
  cartCounter: number;
  userInfo: any = {};
  products: any;
  prodID: any;
  prodInfo: any = {};
  pid: any;
  pname: any;
  pdesc: any;
  pquant: any;
  users:any;
  user_Id: any;
  cartinfo: any = {};
  

  constructor( private cartService: CartService, private router: Router, private ds: DataService) {}



  @ViewChild('content') callAPIDialog: TemplateRef<any>;
  
  ngOnInit(){
    this.pullProducts();
    this.pullUsers();
    this.pullCart();
  }


  pullCart() {

    this.cartinfo.user_Id = localStorage.getItem("id");
    console.log(this.cartinfo);
    this.ds.sendApiRequest("cart",localStorage.getItem("id")).subscribe(data => {
     
    this.cart = data.payload;

    for (let i = 0; i <= this.cart.length; i++) {
      this.cartCounter = i;
    }
  })
}
  getTotal() {
    throw new Error('Method not implemented.');
  }

  // Function that will pull user
  pullUsers() {
    this.userInfo.user_Id = localStorage.getItem("id");
      console.log(this.userInfo);
      this.ds.sendApiRequest("users",localStorage.getItem("id")).subscribe(data => {
       
        this.users = data.payload;

    console.log(this.users);
  })
}


  //Function that will pull products items
  pullProducts(){
    this.ds.sendApiRequest("products", null).subscribe(data => {
      this.products = data.payload;
    })
  }

// Add to cart function from pulled data, one item will insert per click.
  addToCart  = (products) => {
    
    this.prodInfo.cart_pname = products.pname;
    this.prodInfo.cart_pquant = products.pquant;
    this.prodInfo.cart_pdesc = products.pdesc;
    this.prodInfo.user_id = localStorage.getItem("id");
    

    this.ds.sendApiRequest("addCart", JSON.parse(JSON.stringify(this.prodInfo))).subscribe(data => {
      this.pullProducts();
      // this.pullCart();
    });

    Swal.fire({
      icon: 'success',
      text: 'Successfuly Added!',
    })

    this.router.navigate(['/cart'])

    console.log(this.prodInfo);
  }

  openCart(){
    this.router.navigate(['/cart']);
  }
}
