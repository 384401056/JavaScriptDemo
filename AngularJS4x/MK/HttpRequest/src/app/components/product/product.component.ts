import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //用来接收http服务返回的流。
  private dateSource: Observable<any>;
  private products: Array<any> = [];

  constructor(private http: Http) {

    //添加请求头的方法。Headers 也是 '@angular/http 定义的，不要引错包。
    let myHeaders: Headers = new Headers();
    myHeaders.append("Authorization", "Basic 123456");

    /**
     * 此处只是定义了http请求，获取数据流(json)。
     * 要在后面订阅才能获取到数据。
     * 或者可以在html页面中直接使用管道来发起http请求,就不再需要订阅的步骤了。如下：
     * private products:Observable<any>;
     * this.products = this.http.get('/api/products').map((res)=>res.json());
     * *ngFor="let product of products | sync"
     */
    this.dateSource = this.http.get('/api/products', { headers: myHeaders })
    .map((res) => res.json());


  }

  ngOnInit() {
    //只有在调用subscribe方法时，才是正真的发送http请求，获取返回值。
    this.dateSource.subscribe((date) => {
      this.products = date;
      // console.log(this.products);
    });
  }

}
