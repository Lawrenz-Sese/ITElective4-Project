import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemProductsPageRoutingModule } from './item-products-routing.module';

import { ItemProductsPage } from './item-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemProductsPageRoutingModule
  ],
  declarations: [ItemProductsPage]
})
export class ItemProductsPageModule {}
