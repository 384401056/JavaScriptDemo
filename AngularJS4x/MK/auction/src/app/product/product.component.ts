import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product, ProductService } from '../services/product.service';
// import "rxjs/Rx"

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Product[];
  private imgURL:string = "http://placehold.it/320x150"; //缩略图地址
  private keyword:string; //输入框中输入的查询字符
  private myFormControl:FormControl = new FormControl(); //响应式编程

  //注入服务
  constructor(private providerService:ProductService) { }

  ngOnInit() {
    this.providerService.getProducts().subscribe(
      (data)=>this.products = data
    );

    //订单input的valueChanges事件. 使用 debounceTime(500)要进行 import "rxjs/Rx"
    this.myFormControl.valueChanges.debounceTime(500).subscribe(
      value=>{
        this.keyword = value;
        console.log(this.keyword);
      }
    );
  }

}

