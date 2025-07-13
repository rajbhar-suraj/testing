import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  imports: [NgIf, NgFor, CurrencyPipe],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  apiUrl = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<Product[]>(`${environment.apiUrl}/products`).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Failed to fetch products:', err);
      },
    });
  }

  addProduct() {
    this.router.navigate(['/products/add']);
  }

  editProduct(product: Product) {
    this.router.navigate(['/products/edit', product.id]);
  }

  deleteProduct(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.http.delete(`${environment.apiUrl}/products/${id}`).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== id);
      },
      error: (err) => {
        console.error('Failed to delete product:', err);
      },
    });
  }
}
