import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  constructor( public route: Router ) { }

  loginUser(){
    this.route.navigate(['/tabs']);

    Swal.fire({
      icon: 'success',
      text: 'Welcome, Lawrenz!',
    })
  }

  ngOnInit() {
  }

}
