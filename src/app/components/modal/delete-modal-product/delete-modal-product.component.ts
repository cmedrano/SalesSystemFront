import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../models/product.models';

@Component({
  selector: 'app-delete-modal-product',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './delete-modal-product.component.html',
  styleUrl: './delete-modal-product.component.scss'
})
export class DeleteModalProductComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteModalProductComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      productDelete: Product,
    }
  ) { }

  close() {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}

