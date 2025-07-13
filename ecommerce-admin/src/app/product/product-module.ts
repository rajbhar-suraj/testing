import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { productRoutes } from './product.routes';
import { ProductListComponent } from './pages/product-list/product-list';

@NgModule({
  // declarations: [ProductList],
  imports: [CommonModule, RouterModule.forChild(productRoutes)],
})
export class ProductModule {

}
