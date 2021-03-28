import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  // cardContent: any = [
  //   {product: 'Pork', price: '400', img: '../../assets/cart.png'},
  //   {product: 'Chicken', price: '180', img: '../../assets/cart.png'},
  //   {product: 'Beef', price: '400', img: '../../assets/cart.png'},
  //   {product: 'Potato', price: '100', img: '../../assets/cart.png'}
  // ]
  cart = [];
  items = [];

  sliderConfig = {
    spaceBetween: 7,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  constructor( private cartService: CartService, private router: Router) {}

  ngOnInit(){
    this.cart = this.cartService.getCart();
    this.items = this.cartService.getProducts();
  }
  addToCart(product){
    this.cartService.addProduct(product);
  }
  openCart(){
    this.router.navigate(['/cart']);
  }
}
