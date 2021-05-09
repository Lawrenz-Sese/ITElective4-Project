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

  // cart = [];
  // items = [];

  sliderConfig = {
    spaceBetween: 7,
    centeredSlides: true,
    slidesPerView: 1.6
  }
  

  constructor( private cartService: CartService, private router: Router, private ds: DataService) {}
  products: any;
  prodID: any;
  prodInfo: any = {};
  pid: any;
  pname: any;
  pdesc: any;
  pquant: any;

  @ViewChild('content') callAPIDialog: TemplateRef<any>;
  
  ngOnInit(){
    // this.cart = this.cartService.getCart();
    // this.items = this.cartService.getProducts();
    this.pullProducts();
  }

  pullProducts(){
    this.ds.sendApiRequest("products", null).subscribe(data => {
      this.products = data.payload;
    })
  }



  

  addToCart  = (products) => {

    this.prodInfo.cart_pname = products.pname;
    this.prodInfo.cart_pquant = products.pquant;

    this.ds.sendApiRequest("addCart", JSON.parse(JSON.stringify(this.prodInfo))).subscribe(data => {
      this.pullProducts();
    });

    Swal.fire({
      icon: 'success',
      text: 'Successfuly Added!',
    })

    this.router.navigate(['/cart'])

    console.log(this.prodInfo);
  }

  addCart(e){
    
  }
  openCart(){
    this.router.navigate(['/cart']);
  }
}
