import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // Agregar un nuevo elemento a la colección 'items'
  addItem(item: any) {
    const itemsCollection = collection(this.firestore, 'products');
    return addDoc(itemsCollection, item);
  }

  // Obtener los datos en tiempo real de la colección 'items'
  getItems(): Observable<any[]> {
    const itemsCollection = collection(this.firestore, 'products');
    return collectionData(itemsCollection, { idField: 'id' }) as Observable<any[]>;
  }
}
