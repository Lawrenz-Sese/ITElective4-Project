import { Component } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { Router } from '@angular/router';
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';


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

  constructor(private ds: DataService, public route: Router) { }
  slidesOptions = {
    slidesPerView: 2
  }

  @ViewChild('content') callAPIDialog: TemplateRef<any>;

  ngOnInit(): void {
    this.pullCheck();
  }
  pullCheck() {
    this.checkInfo.user_Id = localStorage.getItem("id");
    this.ds.sendApiRequest("check",localStorage.getItem("id")).subscribe(data => {
    this.check = data.payload;

  })
}

clickBtn(){
  Swal.fire({
    icon: 'success',
    title: 'Received Items!',
    showConfirmButton: false,
    backdrop: false,
    timer: 1500
  })
}



}
