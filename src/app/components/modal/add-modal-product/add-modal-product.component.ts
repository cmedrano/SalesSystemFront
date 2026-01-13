import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../../models/product.models';

@Component({
  selector: 'app-add-modal-product',
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule
    ],
  templateUrl: './add-modal-product.component.html',
  styleUrl: './add-modal-product.component.scss'
})
export class AddModalProductComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  product: Product = {
    id: 0,
    name: '',
    description: '',
    categories: [],
    imageUrl: '',
  };

  imagePreview: string | null = null;
  selectedFile: File | null = null;
  uploadError = '';
  maxFileSize = 5 * 1024 * 1024; // 5MB

  availableCategories: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddModalProductComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.availableCategories = data.availableCategories;
  }

  // Cerrar modal
  close() {
    this.dialogRef.close();
  }

  // Agregar Categorías
  addCategoryToProduct(categoryId: number) {
    if (!categoryId) return;

    const category = this.availableCategories.find(c => c.id === categoryId);
    const exists = this.product.categories.some((c: any) => c.id === categoryId);

    if (category && !exists) {
      this.product.categories.push(category);
    }
  }

  removeCategory(index: number) {
    this.product.categories.splice(index, 1);
  }

  // Imagen
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (!file) return;

    if (!this.isValidFileType(file)) {
      this.uploadError = 'Formato no válido.';
      return;
    }

    if (file.size > this.maxFileSize) {
      this.uploadError = 'Máximo 5MB.';
      return;
    }

    this.uploadError = '';
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.product.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    this.product.imageUrl = '';

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  private isValidFileType(file: File): boolean {
    return ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type);
  }

  // Guardar
  saveNewProduct() {
    const newProduct = {
      name: this.product.name,
      description: this.product.description,
      imageUrl: this.product.imageUrl,
      categories: this.product.categories.map((c: any) => c.id)
    };

    this.productService.createProduct(newProduct).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];

    // validar tamaño
    if (file.size > this.maxFileSize) {
      this.uploadError = 'Máximo 5MB';
      return;
    }

    // validar tipo
    if (!file.type.startsWith('image/')) {
      this.uploadError = 'Archivo no válido';
      return;
    }

    this.uploadError = '';
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;

      this.product.imageUrl = this.imagePreview;
    };
    reader.readAsDataURL(file);
  }
}
