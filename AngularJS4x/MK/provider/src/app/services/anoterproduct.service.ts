import { Injectable } from '@angular/core';
import { ProductService, Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class AnoterproductService implements ProductService {

  getProduct(): Product {
    return new Product(1,"SUMSING 10",8888,"世界上最贵的三星手机.");
  }
  constructor() { }
}
