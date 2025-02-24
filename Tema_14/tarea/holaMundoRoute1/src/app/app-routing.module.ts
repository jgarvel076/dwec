import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PagenotfoundComponent } from
'./pagenotfound/pagenotfound.component';
import { ChildBComponent } from './child-b/child-b.component';
import { ChildAComponent } from './child-a/child-a.component';
const routes: Routes = [ { path: 'home',
  component: HomeComponent,
  children: [
  {
  path: 'child-a', // child route path
  component: ChildAComponent,
  },
  {
  path: 'child-b',
  component: ChildBComponent,
  },
  ]
 },
 
  { path: 'productos', component: ProductosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
