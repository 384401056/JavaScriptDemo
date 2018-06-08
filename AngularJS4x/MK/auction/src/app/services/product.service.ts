import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:Http) { }

  //搜索事件发射器
  searchEvent:EventEmitter<SearchParams> = new EventEmitter();

  /**
   * 返回Product数组。
   */
  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products').map(res=>res.json());//返回流
  }

  /**
   * 根据id返回单个Product对象。
   * @param id 
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get('/api/products/'+id).map(res=>res.json());
  }

  /**
   * 根据商品ID返回评论信息数组。
   * @param proId 
   */
  getCommentsByProId(proId:number): Observable<Comment[]> {
    return this.http.get('/api/comments/'+proId).map(res=>res.json());
  }

  /**
   * 返回商品类别
   */
  getCategories():Observable<string[]>{
    return this.http.get('/api/categories').map(res=>res.json());
  }

  /**
   * 
   * @param params 搜索商品
   */
  searchProduct(params:SearchParams):Observable<Product[]>{
    //这里的 {search:this.encodeParams(params)+""} 把URLSearchParams转成string好像无法把参数通过url传递。
    return this.http.get('/api/products',{search:this.encodeParams(params)+""}).map(res=>res.json());//返回流
    
    //也可用以下这种方式传递，只是要自动判断哪些参数值为null
    // return this.http.get('/api/products',{search:{
    //   title:params['title'],
    //   price:params['price'],
    //   category:params['category'],
    // }}).map(res=>res.json());//返回流
  }

  //对搜索条件进行解析，生成URLSearchParams
  private encodeParams(params:SearchParams):URLSearchParams{
    //filter 过滤params[key]不为空的条件,/reduce计算数组元素相加后的总和,
    return  Object.keys(params).filter(key=>params[key]).reduce((sum:URLSearchParams, key:string)=>{
          sum.append(key, params[key]);
          return sum;
        }, new URLSearchParams());
  }

  // addComment(com:Comment){
  //   return this.http.post('/api/addComment', com).map(res=>res.json());
  // }

}

/**
 * 搜索参数类
 */
export class SearchParams{
  constructor(
    public title:string,
    public price:number,
    public category:string,
  ){}
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
