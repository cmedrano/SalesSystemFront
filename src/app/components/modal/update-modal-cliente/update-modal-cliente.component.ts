import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { AddModalClienteComponent } from '../add-modal-cliente/add-modal-cliente.component';
import { MatButtonModule } from '@angular/material/button';
import { Client, UpdateClient } from '../../../models/client.model';

@Component({
  selector: 'app-update-modal-cliente',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './update-modal-cliente.component.html',
  styleUrl: './update-modal-cliente.component.scss'
})
export class UpdateModalClienteComponent implements OnInit {
  emailInput = new FormControl('', [Validators.required, Validators.email]);
  editedClient: UpdateClient;

  constructor(private dialogRef: MatDialogRef<AddModalClienteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      clientEdit: Client,
    }) {
    this.editedClient = {
      address: data.clientEdit.address || "",
      phone: data.clientEdit.phone || "",
      email: data.clientEdit.email || ""
    };
  }

  ngOnInit(): void {
    // ✅ Inicializar el FormControl con el email del cliente
    this.emailInput.setValue(this.data.clientEdit.email || '');
    
    // Sincronizar cambios del emailInput con editedClient
    this.emailInput.valueChanges.subscribe(value => {
      if (value !== null) {
        this.editedClient.email = value;
      }
    });
  }

  // Cerrar Modal
  close() {
    this.dialogRef.close();
  }

  saveNewClient(): void {
    // Validar email antes de guardar
    if (this.emailInput.invalid) {
      this.emailInput.markAsTouched();
      return;
    }

    // Actualizar email desde el FormControl
    this.editedClient.email = this.emailInput.value || '';

    // ✅ Cerrar y pasar LOS DATOS EDITADOS
    this.dialogRef.close(this.editedClient);
  }

}
