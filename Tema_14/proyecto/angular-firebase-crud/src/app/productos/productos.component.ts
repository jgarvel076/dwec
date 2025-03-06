import { Component, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Producto {
  id?: string;
  name: string;
  price: number;
  url: string;
}

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos: Observable<Producto[]>;
  newProducto: Producto = { name: '', price: 0, url: '' };

  constructor(private firestore: AngularFirestore, private renderer: Renderer2) {
    this.productos = this.firestore.collection<Producto>('products').valueChanges({ idField: 'id' });
  }

  addProducto() {
    if (this.newProducto.name && this.newProducto.price && this.newProducto.url) {
      this.firestore.collection('products').add(this.newProducto).then(() => {
        this.newProducto = { name: '', price: 0, url: '' };
      });
    }
  }
}