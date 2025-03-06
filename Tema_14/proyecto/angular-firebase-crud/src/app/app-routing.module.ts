import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },  
  { path: '**', component: PagenotfoundComponent }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
