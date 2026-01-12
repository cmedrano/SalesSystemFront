import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddModalClienteComponent } from '../modal/add-modal-cliente/add-modal-cliente.component';
import { DeleteModalClienteComponent } from '../modal/delete-modal-cliente/delete-modal-cliente.component';
import { UpdateModalClienteComponent } from '../modal/update-modal-cliente/update-modal-cliente.component';
import { ClientService } from '../../services/client.service';
import { Client, UpdateClient } from '../../models/client.model';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit, OnDestroy {
  allClient: Client[] = []
  filteredClients: Client[] = [];
  searchTerm: string = '';

  constructor( private clientService: ClientService,private dialog: MatDialog ) { }

  ngOnInit() {
    this.loadClient();
  }

  ngOnDestroy(): void {
    
  }

  loadClient() {
    this.clientService.getAllClient().subscribe({
      next: (result) => {
        this.allClient = result
      },
      error: (error) => console.error('Error loading products:', error),
    });
  }
  
  filteredClient() {
    const term = this.searchTerm.toLowerCase().trim();
    return this.allClient.filter((c) => {
      const matchesSearch =
        !term ||
        c.name.toLowerCase().includes(term)

      return matchesSearch;
    });
  }

  // Métodos para el modal de eliminación
  openDeleteModal(client: Client): void {
    this.dialog
      .open(DeleteModalClienteComponent, {
        width: '500px',
        disableClose: true,
        data: {
          clientDelete: client,
        }
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.clientService.deleteClient(client.id).subscribe(() => 
            this.loadClient());
        }
      });
  }

  // Métodos para el modal de Agregar
  openAddModal(): void {
    this.dialog
      .open(AddModalClienteComponent, {
        width: '900px',
        disableClose: true,
        data: {

        }
      })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) {
          this.loadClient();
        }
      });
  }

  // Métodos para el modal de Edición
  openEditModal(client: Client): void {
    this.dialog
      .open(UpdateModalClienteComponent, {
        width: '900px',
        disableClose: true,
        data: {
          clientEdit: client,
        }
      })
      .afterClosed()
      .subscribe((updateData: UpdateClient | null) => {
        if (updateData) {
          console.log('Datos recibidos del modal:', updateData);
          this.clientService.updateClient(client.id ,updateData).subscribe(() => 
            this.loadClient());
        }
      });
  }



}
