import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProduct(){
    return new Product(1,"Iphone X",9988,"世界上最贵的苹果手机.");
  }
}

export class Product{
  constructor(
    public id:number,
    public name:string,
    public price:number,
    public desc:string
  ){}
}