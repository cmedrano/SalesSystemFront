import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../../../models/category.model';
import { Product } from '../../../models/product.models';

@Component({
  selector: 'app-update-modal-product',
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
  templateUrl: './update-modal-product.component.html',
  styleUrl: './update-modal-product.component.scss'
})
export class UpdateModalProductComponent {
product: Product;
  categories: Category[];

  imagePreview: string | null = null;
  uploadError = '';
  maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(
    private dialogRef: MatDialogRef<UpdateModalProductComponent>,
    @Inject(MAT_DIALOG_DATA) data: {product: Product; categories: Category[]; }) 
    {
      this.product = {
        ...data.product,
        categories: [...data.product.categories]
    };

    this.categories = data.categories;
    this.imagePreview = this.product.imageUrl || null;
  }

  // Categoria
  availableCategories(): Category[] {
    const selectedIds = this.product.categories.map(c => c.id);
    return this.categories.filter(c => !selectedIds.includes(c.id));
  }

  addCategory(categoryId: number): void {
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      this.product.categories.push(category);
    }
  }

  removeCategory(index: number): void {
    this.product.categories.splice(index, 1);
  }

  // Imagenes
  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    if (!this.isValidFileType(file)) {
      this.uploadError = 'Formato inválido (JPG, PNG, GIF, WEBP)';
      return;
    }

    if (file.size > this.maxFileSize) {
      this.uploadError = 'Máximo 5MB';
      return;
    }

    this.uploadError = '';

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.product.imageUrl = this.imagePreview;
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.imagePreview = null;
    this.product.imageUrl = '';
  }

  private isValidFileType(file: File): boolean {
    return [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ].includes(file.type);
  }

  close() {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      imageUrl: this.product.imageUrl,
      categories: this.product.categories.map(c => c.id)
    });
  }
}
