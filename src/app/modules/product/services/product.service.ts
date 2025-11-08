import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/product';

  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  create(data: Product) {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: Product) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
