import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private productId:number;
  private productName:string;

  //通过构造函数获取路由信息
  constructor(private routerInfo:ActivatedRoute) { }

  ngOnInit() {
    //获取路由传递过来的参数(参数快照)。如：?id=1&name=Jims 查询参数的方式。
    // this.productId = this.routerInfo.snapshot.queryParams["id"];
    // this.productName = this.routerInfo.snapshot.queryParams["name"];

    //如果在自身页面有指向自身的路由，就不要使用参数订阅模式。
    // this.routerInfo.queryParams.subscribe((params:Params)=>{
    //   this.productId=params["id"];
    //   this.productName=params['name'];
    // })

    

  }

}
