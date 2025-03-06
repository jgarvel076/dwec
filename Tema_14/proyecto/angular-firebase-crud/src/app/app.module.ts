import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ItemListComponent } from './components/item-list/item-list.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, ItemListComponent, MenuComponent, HomeComponent, ProductosComponent, ContactoComponent, PagenotfoundComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    AppRoutingModule
  ],
  providers: [provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent]
})
export class AppModule {}
