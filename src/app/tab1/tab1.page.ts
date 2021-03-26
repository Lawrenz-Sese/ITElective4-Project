import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cardContent: any = [
    {product: 'Pork', price: '400', img: '../../assets/cart.png'},
    {product: 'Chicken', price: '180', img: '../../assets/cart.png'},
    {product: 'Beef', price: '400', img: '../../assets/cart.png'},
    {product: 'Potato', price: '100', img: '../../assets/cart.png'}
  ]
  constructor() {}

}
