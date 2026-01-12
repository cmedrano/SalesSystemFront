import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../../../services/client.service';
import { CreateClient } from '../../../models/client.model';

@Component({
  selector: 'app-add-modal-cliente',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-modal-cliente.component.html',
  styleUrl: './add-modal-cliente.component.scss'
})
export class AddModalClienteComponent {
  emailInput = new FormControl('', [Validators.required, Validators.email]);
  clientCreate: CreateClient = 
    {
      name: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
    }
  constructor(
    private dialogRef: MatDialogRef<AddModalClienteComponent>,
    private clientService: ClientService 
  ) {}

  // Cerrar Modal
  close() {
    this.dialogRef.close();
  }

  saveNewClient() {
    const newClient = {
      name: this.clientCreate.name,
      lastName: this.clientCreate.lastName,
      address: this.clientCreate.address,
      phone: this.clientCreate.phone,
      email: this.clientCreate.email,
    };

    this.clientService.createClient(newClient).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  
}
