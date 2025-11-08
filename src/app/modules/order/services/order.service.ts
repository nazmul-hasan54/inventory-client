import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../product/models/product.model';
import {Order} from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl + '/order';

  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<Order[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(data: Order) {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: Product) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
