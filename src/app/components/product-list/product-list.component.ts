import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../models/category.model';
import { Product, UpdateProduct } from '../../models/product.models';
import { AddModalProductComponent } from '../modal/add-modal-product/add-modal-product.component';
import { DeleteModalProductComponent } from '../modal/delete-modal-product/delete-modal-product.component';
import { UpdateModalProductComponent } from '../modal/update-modal-product/update-modal-product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private categoriesSub!: Subscription;
  private productsSub!: Subscription;

  products: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: Category[] = [];
  product: Product = {
    id: 0,
    name: '',
    description: '',
    categories: [],
    imageUrl: '',
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    console.log(this.categories);
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }

  loadCategories() {
    this.categoriesSub = this.categoryService.getAllCategories().subscribe({
      next: (categorias) => {
        console.log("dentro del metodo load" + categorias);
        this.categories = categorias;
        // this.categories.length = 0;
        // this.categories.push(...categorias);
      },
      error: (e) => {
        console.error('no se pudo obtener categorias, message:', e);
      },
    });
  }

  loadProducts() {
    this.productsSub = this.productService.getAllProducts().subscribe({
      next: (result) => (this.products = result),
      error: (error) => console.error('Error loading products:', error),
    });
  }

  addCategoryToProduct(categoryId: number) {
    if (!categoryId) return;
    const category = this.availableCategories.find(
      (cat) => cat.id === categoryId
    );
    const alreadyExists = this.product.categories.some(
      (cat) => cat.id === categoryId
    );
    if (category && !alreadyExists) {
      this.product.categories.push(category);
    }
  }

  removeCategory(index: number) {
    this.product.categories.splice(index, 1);
  }

  get availableCategories(): Category[] {
    const selectedIds = this.product.categories.map((cat) => cat.id);
    const available = this.categories.filter((cat) => !selectedIds.includes(cat.id))
    return available;
  }

  filteredProducts() {
    const term = this.searchTerm.toLowerCase().trim();
    return this.products.filter((p) => {
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term)
      const matchesCategory =
        !this.selectedCategory ||
        p.categories.some((cat) => cat.name === this.selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }

  // Métodos para el modal de eliminación
  openDeleteModal(product: Product): void {
    this.dialog
      .open(DeleteModalProductComponent, {
        width: '500px',
        disableClose: true,
        data: {
          productDelete: product
        }
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.productService.deleteProduct(product.id).subscribe(() => 
            this.loadProducts());
        }
      });
  }

  // Métodos para el modal de Agregar
  openAddModal(): void {
    this.dialog
      .open(AddModalProductComponent, {
        width: '900px',
        disableClose: true,
        data: {
          availableCategories: [...this.categories]
        }
      })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) {
          this.loadProducts();
        }
      });
  }

  // Métodos para el modal de Edición
  openEditModal(product: Product): void {
    this.dialog
      .open(UpdateModalProductComponent, {
        width: '900px',
        disableClose: true,
        data: {
          product,
          categories: this.categories
        }
      })
      .afterClosed()
      .subscribe((updateData: UpdateProduct | null) => {
        if (updateData) {
          this.productService.updateProduct(updateData).subscribe(() => 
            this.loadProducts());
        }
      });
  }
}
