import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "src/app/service/data.service";
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { EventTriggerService } from '../service/eventTrigger/event-trigger.service';
import { Subscription } from 'rxjs';

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

  // variables
  cart: any;
  productsCounter: number;
  cartCounter: number;
  userInfo: any = {};
  // products: any;
  prodID: any;
  prodInfo: any = {};
  pid: any;
  pname: any;
  pdesc: any;
  pquant: any;
  users:any;
  user_Id: any;
  cartinfo: any = {};

  clickEvent: Subscription;
  

  constructor(private router: Router, private ds: DataService, private ev: EventTriggerService) {
    this.clickEvent = this.ev.getClickEvent().subscribe(()=>{
      this.pullCart();
    })
  }



  @ViewChild('content') callAPIDialog: TemplateRef<any>;
  
  ngOnInit(){
    this.pullProducts();
    this.pullUsers();
    this.pullCart();
  }


  // Pull cart items depends on user logged in account. 
  pullCart() {
    this.cartinfo.user_Id = localStorage.getItem("id");
    this.ds.sendApiRequest("cart",localStorage.getItem("id")).subscribe(data => {
    this.cart = data.payload;

      for (let i = 0; i <= this.cart.length; i++) {
      this.cartCounter = i;
      }
    })
  }


  // Function that will pull user
  pullUsers() {
    this.userInfo.user_Id = localStorage.getItem("id");
    this.ds.sendApiRequest("users",localStorage.getItem("id")).subscribe(data => {
    this.users = data.payload;
  })
}

products: any;

  // Function that will pull products items
  pullProducts(){
    this.ds.sendApiRequest("products", null).subscribe(data => {
    this.products = data.payload;
    })
  }

CValue: String;
select: any;
onChange(CValue){
  this.select = CValue;
  console.log(this.select);
}

// Add to cart function from pulled data, one item will insert per click.
  addToCart  = (products) => {
    
    this.prodInfo.cart_pname = products.pname;
    this.prodInfo.cart_pquant = products.pquant * this.select;
    this.prodInfo.cart_pdesc = products.pdesc * this.select;
    this.prodInfo.user_id = localStorage.getItem("id");
    
    this.ds.sendApiRequest("addCart", JSON.parse(JSON.stringify(this.prodInfo))).subscribe(data => {
      // this.pullProducts();
      this.pullCart();
    });

    Swal.fire({
      icon: 'success',
      text: 'Successfuly Added!',
    })

    // this.router.navigate(['/cart'])

    console.log(this.prodInfo);
  }


  addToCart1  = (frozen) => {
    
    this.prodInfo.cart_pname = frozen.pname;
    this.prodInfo.cart_pquant = frozen.pquant * this.select;
    this.prodInfo.cart_pdesc = frozen.pdesc * this.select;
    this.prodInfo.user_id = localStorage.getItem("id");
    
    this.ds.sendApiRequest("addCart", JSON.parse(JSON.stringify(this.prodInfo))).subscribe(data => {
      // this.pullProducts();
      this.pullCart();
    });

    Swal.fire({
      icon: 'success',
      text: 'Successfuly Added!',
    })

    // this.router.navigate(['/cart'])

    console.log(this.prodInfo);
  }

  openCart(){
    this.router.navigate(['/cart']);
  }
}
