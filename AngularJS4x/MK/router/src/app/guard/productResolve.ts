import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductResolve implements Resolve<Product> {

    constructor(private router:Router){
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
        console.log(route);
        //如果传入此组件的id为1，则返回一个新的Product对象。
        if (route.params['id']==1){
            return new Product(1,'KKKK',2000);
        }else{ //否则，将原参数组装成对象返回。
            return new Product(route.params['id'],route.params['name'],route.params['age']);
        }
    }
}

export class Product {
    constructor(
        public id:number, 
        public name:string, 
        public age:number){
    }
}