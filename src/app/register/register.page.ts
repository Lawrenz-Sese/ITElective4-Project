import { Component, OnInit } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { Router } from '@angular/router';
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor( private ds: DataService, public route: Router ) { }

  ngOnInit() {
  }

  userInfo: any = {};
  user_names :any;
  user_contact :any;
  user_address :any;
  user_email :any;
  user_password :any;
  regUser(){
    this.userInfo.user_names = this.user_names;
    this.userInfo.user_address = this.user_address;
    this.userInfo.user_contact = this.user_contact;
    this.userInfo.user_email = this.user_email;
    this.userInfo.user_password = this.user_password;

    this.ds.sendApiRequest("regUser", JSON.parse(JSON.stringify(this.userInfo))).subscribe(data => {
    });
    Swal.fire({
      icon: 'success',
      text: 'Sign up successfuly!',
    })

    this.route.navigate(['/login']);

    console.log(this.userInfo);
  }
  

}
