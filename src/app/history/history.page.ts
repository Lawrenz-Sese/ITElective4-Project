import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "src/app/service/data.service";
import { CartCheckoutPage } from '../cart-checkout/cart-checkout.page';
import { ModalController } from '@ionic/angular';
import { EventTriggerService } from '../service/eventTrigger/event-trigger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  user_id: any;
  histCounter: number;
  clickEvent: Subscription;

  check_code : any;
  check_date: any;

  constructor( private router: Router, private ds: DataService, private modalCtrl: ModalController, private ev: EventTriggerService ) {
    this.clickEvent = this.ev.getClickEvent().subscribe(()=>{
      this.pullHist();
    })
   }


  async openModal(hist) {
    const modal = await this.modalCtrl.create({
      component: CartCheckoutPage,
      componentProps: {
        codes: hist.check_code,
        dates: hist.check_date,
        name: hist.check_pname,
        desc: hist.check_pdesc,
        quant: hist.check_pquant

      }
    });
    await modal.present();
  }

  ngOnInit() {
    this.pullHist();
  }

  histinfo: any={};
  hist: any;
  label: any;
  pullHist() {
    this.histinfo.user_id = localStorage.getItem("id");
    this.ds.sendApiRequest("hist",localStorage.getItem("id")).subscribe(data => {
    this.hist = data.payload;
    this.ev.sendClickEvent();

    for (let i = 0; i <= this.hist.length; i++) {
      this.histCounter = i;
    }
    if(this.histCounter == 10 ){
      this.label = 'Weak';
    }
    else{
      this.label = 'Bronze'
    }
  })

  
}

}
