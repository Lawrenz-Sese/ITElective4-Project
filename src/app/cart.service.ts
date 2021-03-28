import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private data = [
    {
      category: 'Pizza',
      expanded: true,
      products: [
        { id: 0, name: 'Salami', price: '8' },
        { id: 1, name: 'Classic', price: '7' },
        { id: 2, name: 'Tuna', price: '6' },
        { id: 3, name: 'Hawaii', price: '5' }
      ]
    },
    {
      category: 'Pasta',
      products: [
        { id: 4, name: 'Mac and Cheese', price: '8' },
        { id: 5, name: 'Bolognese', price: '6' }
      ]
    }
  ]
  private cart =[];

  constructor() { }

  getProducts(){
    return this.data;
  }
  getCart(){
    return this.cart;
  }
  addProduct(product) {
    this.cart.push(product);
  }

}
