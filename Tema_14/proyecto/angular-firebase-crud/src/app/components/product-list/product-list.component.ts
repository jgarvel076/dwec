import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  @ViewChild('productContainer') productContainer!: ElementRef;

  constructor(private firebaseService: FirebaseService, private renderer: Renderer2) {}

  ngOnInit() {
    this.firebaseService.getProducts().subscribe(data => {
      this.products = data;
      this.renderer.setProperty(this.productContainer.nativeElement, 'innerHTML', JSON.stringify(data, null, 2));
    });
  }
}