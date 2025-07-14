import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
})
export class ProductFormComponent {
  form: FormGroup;
  images: string[] = [];
  selectedFiles: File[] = [];
  isEdit: boolean = false;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.productId;

    if (this.isEdit && this.productId) {
      this.http
        .get<any>(`${environment.apiUrl}/products/${this.productId}`)
        .subscribe((product) => {
          this.form.patchValue({
            sku: product.sku,
            name: product.name,
            price: product.price,
          });
          this.images = product.images.map(
            (img: string) => `${environment.apiUrl}/uploads/${img}`
          );
        });
    }
  }

  onImageUpload(event: any) {
    const files = event.target.files;
    for (let file of files) {
      this.selectedFiles.push(file);
      const reader = new FileReader();
      reader.onload = () => this.images.push(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('sku', this.form.value.sku);
    formData.append('name', this.form.value.name);
    formData.append('price', this.form.value.price);

    for (let file of this.selectedFiles) {
      formData.append('images', file);
    }

    if (this.isEdit && this.productId) {
      this.http
        .put(`${environment.apiUrl}/products/${this.productId}`, formData)
        .subscribe(() => this.router.navigate(['/products']));
    } else {
      this.http
        .post(`${environment.apiUrl}/products`, formData)
        .subscribe(() => this.router.navigate(['/products']));
    }
  }
}
