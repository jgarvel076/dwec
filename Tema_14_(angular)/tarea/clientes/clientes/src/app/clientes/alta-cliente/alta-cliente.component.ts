import { Component } from '@angular/core';
import { ClientesService } from './../clientes.service';
import { Cliente, Grupo } from './../cliente.model';


@Component({
  selector: 'app-alta-cliente',
  standalone: false,
  templateUrl: './alta-cliente.component.html',
  styleUrl: './alta-cliente.component.css'
})
export class AltaClienteComponent {
  cliente: Cliente;
  grupos: Grupo[];
  constructor(private clientesService: ClientesService) {
    this.cliente = this.clientesService.nuevoCliente();
    this.grupos = this.clientesService.getGrupos();


  }
  nuevoCliente(): void {
    this.clientesService.agregarCliente(this.cliente);
    this.cliente = this.clientesService.nuevoCliente();
  }
  ngOnInit():void {
  }
}
