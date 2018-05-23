import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../guard/productResolve';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  private Id:number;
  private Name:string;
  private Age:Number;

  constructor(private routerInfo:ActivatedRoute) { }

  ngOnInit() {
        //获取路由传递过来的参数(参数快照), REST full方式传递的方式
        // this.Id = this.routerInfo.snapshot.params["id"];
        // this.Name = this.routerInfo.snapshot.params["name"];
        // this.Age = this.routerInfo.snapshot.params["age"];

        //获取路由传递过来的参数(参数订阅)
        // this.routerInfo.params.subscribe((params:Params)=>{
        //   this.Id = params["id"];
        //   this.Name = params["name"];
        //   this.Age = params["age"];
        // })

        //通过resolve发送来的值。
        this.routerInfo.data.subscribe((data:{product:Product})=>{
          this.Id = data.product.id;
          this.Name = data.product.name;
          this.Age = data.product.age;
        })

  }

}
