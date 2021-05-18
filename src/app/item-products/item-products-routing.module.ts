import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemProductsPage } from './item-products.page';

const routes: Routes = [
  {
    path: '',
    component: ItemProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemProductsPageRoutingModule {}
