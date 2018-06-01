import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    new Product(1, "第一个商品", 20.3, 4.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "儿童食品"]),
    new Product(2, "第二个商品", 30.64, 2.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["儿童食品", "日用百货"]),
    new Product(3, "第三个商品", 40.4, 1.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "日用百货"]),
    new Product(4, "第四个商品", 50.47, 3.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "日用百货"]),
    new Product(5, "第四个商品", 60.34, 4.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "儿童食品"]),
    new Product(6, "第五个商品", 70.34, 2.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "日用百货"]),
    new Product(7, "第五个商品", 80.4, 3.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["儿童食品", "日用百货"]),
    new Product(8, "第六个商品", 90.34, 4.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "儿童食品"]),
    new Product(9, "第一个商品", 120.4, 1.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "日用百货"]),
    new Product(10, "第一个商品", 420.34, 3.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["儿童食品", "日用百货"]),
  ];

  private comments: Comment[] = [
    new Comment(1, 1, "2018-12-12 12:20:40", "张三", 5, "商品不错，下次还会光顾的."),
    new Comment(2, 1, "2018-12-12 12:20:40", "李四", 5, "商品不错，下次还会光顾的."),
    new Comment(3, 2, "2018-12-12 12:20:40", "王五", 5, "商品不错，下次还会光顾的."),
    new Comment(4, 2, "2018-12-12 12:20:40", "赵六", 5, "商品不错，下次还会光顾的."),
    new Comment(5, 3, "2018-12-12 12:20:40", "陈七", 5, "商品不错，下次还会光顾的."),
  ];

  constructor() { }

  /**
   * 返回Product数组。
   */
  getProducts(): Product[] {
    return this.products;
  }

  /**
   * 根据id返回单个Product对象。
   * @param id 
   */
  getProductById(id: number): Product {
    console.log("getProductById: id="+id);
    //find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
    return this.products.find(pro => pro.id == id);
    //以上写法可写为：
    // return this.products.find((pro:Product):boolean=>{
    //   console.log(pro.id);
    //   console.log(pro.id == id);
    //   return (pro.id == id);
    // });
  }

  /**
   * 根据商品ID返回评论信息数组。
   * @param proId 
   */
  getCommentsByProId(proId:number): Comment[] {
    //filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
    return this.comments.filter((commont:Comment)=>commont.productId == proId);
    //以上写法可写为：
    // return this.comments.filter((commont:Comment):boolean=>{
    //   return (commont.productId == proId);
    // });
  }

  getCategories():string[]{
    return ["电子商品", "儿童食品","日用百货"];
  }

}

/**
 * 商品类
 */
export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) { }
}

/**
 * 评论类
 */
export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) { }
}
