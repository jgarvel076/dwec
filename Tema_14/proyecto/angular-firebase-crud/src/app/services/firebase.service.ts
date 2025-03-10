import { Injectable } from '@angular/core';
import { Firestore, collection,addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  getProductos(): Observable<any[]> {
    const ref = collection(this.firestore, 'productos');
    return collectionData(ref, { idField: 'id' });
  }

  addItem(item: any) {
    const itemsCollection = collection(this.firestore, 'productos');
    return addDoc(itemsCollection, item);
  }
  

}