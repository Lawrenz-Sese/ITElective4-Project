import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "src/app/service/data.service";
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { EventTriggerService } from '../service/eventTrigger/event-trigger.service';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ViewPage } from '../view/view.page';

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
  

  constructor( private modalCtrl: ModalController, private router: Router, private ds: DataService, private ev: EventTriggerService) {
    this.clickEvent = this.ev.getClickEvent().subscribe(()=>{
      this.pullCart();
    })
  }

  async openModal(products) {
    const modal = await this.modalCtrl.create({
      component: ViewPage,
      componentProps: {
        name: products.prod_name,
        price: products.prod_price,
        image: products.prod_img,
        desc: products.prod_description

      }
    });
    await modal.present();
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

  openCart(){
    this.router.navigate(['/cart']);
  }
}
