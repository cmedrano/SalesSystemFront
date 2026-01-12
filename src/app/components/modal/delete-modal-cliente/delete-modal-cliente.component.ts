import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-delete-modal-cliente',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './delete-modal-cliente.component.html',
  styleUrl: './delete-modal-cliente.component.scss'
})
export class DeleteModalClienteComponent {

  constructor(
      private dialogRef: MatDialogRef<DeleteModalClienteComponent>,
      @Inject(MAT_DIALOG_DATA)
      public data: {
        clientDelete: Client
      }
    ) { }
    
  close() {
    this.dialogRef.close();
  }

  
  confirm(): void {
    this.dialogRef.close(true);
  }

}
