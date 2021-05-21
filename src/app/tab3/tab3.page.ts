import { Component } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  users: any;
  userInfo: any = {};
  user_id: any;

  constructor( private ds: DataService, public route: Router ) {}

  @ViewChild('content') callAPIDialog: TemplateRef<any>;

  ngOnInit(): void {
    this.pullUsers();
  }

  pullUsers() {
    this.userInfo.user_Id = localStorage.getItem("id");
      console.log(this.userInfo);
      this.ds.sendApiRequest("users",localStorage.getItem("id")).subscribe(data => {
       
        this.users = data.payload;

    console.log(this.users);
  })
}

logout(){

  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Proceed'
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

}
