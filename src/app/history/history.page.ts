import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "src/app/service/data.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  user_id: any;
  histCounter: number;

  constructor( private router: Router, private ds: DataService ) { }

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
