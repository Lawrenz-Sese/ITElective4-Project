import { Component } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventTriggerService } from '../service/eventTrigger/event-trigger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  //variables
  clickEvent: Subscription;
  users: any;
  userInfo: any = {};
  user_id: any;
  cartinfo: any ={};
  cart: any;
  cartCounter: number;
  user_Id: any
  dates: any;

  constructor( private ds: DataService, public route: Router, private ev: EventTriggerService ) {
    this.clickEvent = this.ev.getClickEvent().subscribe(()=>{
      this.pullHist();
      this.pullCart();
    })
  }

  @ViewChild('content') callAPIDialog: TemplateRef<any>;

  ngOnInit(): void {
    this.pullUsers();
    this.pullCart();
    this.pullHist();
  }

  //This function will pull the user information depends on the logged in account. 
  pullUsers() {
    this.userInfo.user_Id = localStorage.getItem("id");
    this.ds.sendApiRequest("users",localStorage.getItem("id")).subscribe(data => {
    this.users = data.payload;


    })
  }

// Logout function, will remove the localStorage after confirmed. 
logout(){
  Swal.fire({
    title: 'Logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    backdrop: false
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      window.localStorage.removeItem('id');
      this.route.navigate(['/login']);
      Swal.fire({
        icon: 'success',
        text: 'Logout',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })
}

// Pull cart for user info cart information
pullCart() {
  this.cartinfo.user_Id = localStorage.getItem("id");
  this.ds.sendApiRequest("cart",localStorage.getItem("id")).subscribe(data => {
  this.cart = data.payload;

  for (let i = 0; i <= this.cart.length; i++) {
    this.cartCounter = i;
  }
})
}

histinfo: any={};
hist: any;
label: any;
histCounter: number;
pullHist() {
  this.histinfo.user_id = localStorage.getItem("id");
  this.ds.sendApiRequest("hist",localStorage.getItem("id")).subscribe(data => {
  this.hist = data.payload;

  for (let i = 0; i <= this.hist.length; i++) {
    this.histCounter = i;
  }
  if(this.histCounter >= 1 && this.histCounter <= 6  ){
    this.label = 'Herald';
  }
  if(this.histCounter >= 7 && this.histCounter <= 8){
    this.label = 'Archon';
  }
  if(this.histCounter >= 9 && this.histCounter <=30 ){
    this.label = 'Legend';
  }
})


}


}
