import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos = [
    { nombre: 'nokia 3210', descripcion: 'Lo mejor en tecnologia actual', imagen: './images/nokia.jpg', precio: 49.99 },
    { nombre: 'nike total 90', descripcion: 'Zapatos de tacos', imagen: './images/nike.jpg', precio: 79.99 }
  ];
}