import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { CreateUpdateProductComponent } from './products/create-update-product/create-update-product.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, },
    { path: 'list-products', component: ListProductsComponent },
    { path: 'create-update-product', component: CreateUpdateProductComponent },
    { path: 'create-update-product/:id', component: CreateUpdateProductComponent },
    { path: '**', component: NopagefoundComponent },
];
