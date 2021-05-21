import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  name: any;



  constructor( public route: Router, private ds: DataService ) { }

  userInfo:any = {};
  user_email: any;
  user_password: any;


  ngOnInit() {
  }

  async loginUser(){
    this.userInfo.user_email = this.user_email;
    this.userInfo.user_password = this.user_password;

   

    await this.ds.sendApiRequest("loginUser", this.userInfo).subscribe(res => {

      if (res.payload == 0) {
      
        alert("Incorrect Credentials");
      
      }
      else{
        localStorage.setItem("Fullname", res.payload.Fullname);
        localStorage.setItem("id", res.payload.user_id);

        Swal.fire({
          icon: 'success',
          text: 'Welcome' +' '+ res.payload.Fullname + '!',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigate(['/main']);
      }
    });

    
  }


}
