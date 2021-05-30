import { Component } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { Router } from '@angular/router';
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { EventTriggerService } from '../service/eventTrigger/event-trigger.service';
import { Subscription } from 'rxjs';

import { CartCheckoutPage } from '../cart-checkout/cart-checkout.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  alertCtrl: any;
  productinfo: any;
  checkInfo: any = {};
  check: any;
  user_Id: any;

  clickEvent: Subscription;

  constructor(private ds: DataService, public route: Router, private ev: EventTriggerService, private modalCtrl: ModalController) {
    this.clickEvent = this.ev.getClickEvent().subscribe(()=>{
      this.pullCheck();
    })
   }
  slidesOptions = {
    slidesPerView: 2
  }


  @ViewChild('content') callAPIDialog: TemplateRef<any>;

  ngOnInit(){
    this.pullCheck();
  }

  pullCheck() {
    this.checkInfo.user_Id = localStorage.getItem("id");
    this.ds.sendApiRequest("check",localStorage.getItem("id")).subscribe(data => {
    this.check = data.payload;

  })
}
checkinfo: any = {};

async delCheck(e) {
  this.checkinfo.check_id = e;

      this.ds.sendApiRequest("delCheck", JSON.parse(JSON.stringify(this.checkinfo))).subscribe(data => {
        this.pullCheck();
      });
}

histInfo: any = {};

addHist = (check) => {

    
  this.histInfo.check_id = check.check_id;
  this.histInfo.check_pname = check.check_pname;
  this.histInfo.check_pdesc = check.check_pdesc;
  this.histInfo.check_pquant = check.check_pquant;

  this.histInfo.check_code = check.check_code;
  this.histInfo.user_id = localStorage.getItem("id");

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

  this.ds.sendApiRequest("addHist", JSON.parse(JSON.stringify(this.histInfo))).subscribe(data => {
    // this.pullProducts();
    this.pullCheck();
    this.delCheck(this.histInfo.check_id);
    this.ev.sendClickEvent();
  });
  // Swal.fire(
  //   'Deleted!',
  //   'Your file has been deleted.',
  //   'success'
  // )
}
})
  // this.router.navigate(['/cart'])
  }



}
