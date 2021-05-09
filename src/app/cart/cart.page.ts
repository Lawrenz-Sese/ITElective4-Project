import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { DataService } from "src/app/service/data.service";
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  selectedItems = [];
  total = 0;

  cart: any;
  constructor(private router: Router, private ds: DataService) { }

  
  @ViewChild('content') callAPIDialog: TemplateRef<any>;

  ngOnInit() {
    this.pullCart();
}


pullCart(){
  this.ds.sendApiRequest("cart", null).subscribe(data => {
    this.cart = data.payload;
  })

  console.log("cart");
}

async delCart(e) {

  this.ds.sendApiRequest("delProduct", JSON.parse(JSON.stringify(e))).subscribe(data => {
    this.pullCart();
  });
}
}