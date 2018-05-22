import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Array<Product>;
  private imgURL:string = "http://placehold.it/320x150"; //缩略图地址
  constructor() { }

  ngOnInit() {
    this.products = [
      new Product(1,"第一个商品",20.34,4.5,"这是一个商品，就是一个商品，为什么是一个商品？我不知道。",["电子商品","儿童食品"]),
      new Product(2,"第一个商品",30.34,2.5,"这是一个商品，就是一个商品，为什么是一个商品？我不知道。",["儿童食品","日用百货"]),
      new Product(3,"第一个商品",40.34,1.5,"这是一个商品，就是一个商品，为什么是一个商品？我不知道。",["电子商品","日用百货"]),
      new Product(4,"第一个商品",50.34,3.5,"这是一个商品，就是一个商品，为什么是一个商品？我不知道。",["电子商品","日用百货"]),
      new Product(5,"第一个商品",60.34,4.5,"这是一个商品，就是一个商品，为什么是一个商品？我不知道。",["电子商品","儿童食品"]),
      new Product(6,"第一个商品",70.34,2.5,"这是一个商品，就是一个商品，为什么是一个商品？我不知道。",["电子商品","日用百货"]),
      new Product(7,"第一个商品",80.34,3.5,"这是一个商品，就是一个商品，为什么是一个商品？我不知道。",["儿童食品","日用百货"]),
      new Product(8,"第一个商品",90.34,4.5,"这是一个商品，就是一个商品，为什么是一个商品？我不知道。",["电子商品","儿童食品"]),
      new Product(9,"第一个商品",120.34,1.5,"这是一个商品，就是一个商品，为什么是一个商品？我不知道。",["电子商品","日用百货"]),
      new Product(10,"第一个商品",420.34,3.5,"这是一个商品，就是一个商品，为什么是一个商品？我不知道。",["儿童食品","日用百货"]),
    ]
  }

}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {

  }
}
