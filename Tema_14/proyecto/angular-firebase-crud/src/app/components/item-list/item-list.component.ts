import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/firebase.service';

@Component({
  selector: 'app-item-list',
  standalone: false,
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  newItem: string = '';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Escuchar cambios en la colección
    this.firebaseService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  addItem() {
    if (this.newItem.trim()) {
      this.firebaseService.addItem({ name: this.newItem }).then(() => {
        this.newItem = ''; // Limpiar el input
      });
    }
  }
}
