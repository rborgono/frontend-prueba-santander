import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environmentBackend } from '../../environments/environments';

const apiUrl = `${ environmentBackend.url }:${ environmentBackend.port }/api/products/`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(apiUrl);
  }

  getProductById(id: string) {
    return this.http.get(`${ apiUrl }/${ id }`);
  }

  updateProduct(id: string, values: any) {
    return this.http.put(`${ apiUrl }/${ id }`, values);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${ apiUrl }/${ id }`);
  }

  createProduct(values: any) {
    return this.http.post(apiUrl, values);
  }

}
