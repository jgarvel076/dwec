import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  standalone:false,
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];  // Lista de productos
  nuevoProducto = { name: '', precio: 0, url: '' }; // Modelo del nuevo producto

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.firebaseService.getProductos().subscribe(
      (data: any[]) => {
        console.log('Productos cargados:', data);
        this.productos = data;
      },
      (error: any) => {
        console.error('Error cargando productos:', error);
      }
    );
  }

  addProducto() {
    if (!this.nuevoProducto.name || !this.nuevoProducto.precio || !this.nuevoProducto.url) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    this.firebaseService.addItem(this.nuevoProducto)
      .then(() => {
        alert('Producto añadido con éxito');
        this.nuevoProducto = { name: '', precio: 0, url: '' }; // Reiniciar el formulario
        this.cargarProductos(); // Recargar la lista de productos
      })
      .catch(error => console.error('Error al añadir producto:', error));
  }
}