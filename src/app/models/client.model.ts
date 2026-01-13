export interface Client {
  id: number;
  name: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
}

export interface UpdateClient {
  address: string;
  phone: string;
  email: string;
}

export interface CreateClient {
  name: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
}