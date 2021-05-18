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
  

  constructor( private cartService: CartService, private router: Router, private ds: DataService) {}
  products: any;
  prodID: any;
  prodInfo: any = {};
  pid: any;
  pname: any;
  pdesc: any;
  pquant: any;
  users:any;

  @ViewChild('content') callAPIDialog: TemplateRef<any>;
  
  ngOnInit(){
    // this.cart = this.cartService.getCart();
    // this.items = this.cartService.getProducts();
    this.pullProducts();
    this.pullCart();
    this.pullUsers();
  }

  // Function that will pull user
  pullUsers() {
    this.ds.sendApiRequest("users", null).subscribe(data => {
      this.users = data.payload;
    })
  }
  // Function that wil pull cart items
  pullCart(){
    this.ds.sendApiRequest("cart", null).subscribe(data => {
      this.cart = data.payload;
      for (let i = 0; i <= this.cart.length; i++) {
        this.cartCounter = i;
      }
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

    this.ds.sendApiRequest("addCart", JSON.parse(JSON.stringify(this.prodInfo))).subscribe(data => {
      this.pullProducts();
      this.pullCart();
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
