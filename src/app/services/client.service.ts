import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, CreateClient, UpdateClient } from '../models/client.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${environment.apiUrl}/api/Client`;

  constructor(private http: HttpClient) { }

  getAllClient(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  createClient(client: CreateClient): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(id: number, client: UpdateClient): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Client>(url, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
