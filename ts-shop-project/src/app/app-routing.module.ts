import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './Components/shop/shop.component';
import { ShopItemDetailsComponent } from './Components/shop-item-details/shop-item-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/shopMainPage', pathMatch: 'full' },
  { path: 'shopMainPage', component: ShopComponent },
  { path: 'detail/:id', component: ShopItemDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
