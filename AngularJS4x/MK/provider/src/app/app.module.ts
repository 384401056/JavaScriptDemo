import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './services/product.service';
import { AnoterproductService } from './services/anoterproduct.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    //通过工厂，来选择性的注入 productcomponent的依赖 ProductService
    {provide:ProductService, useFactory:(dev, obj)=>{
      if (dev && obj.dev) {
        return new ProductService();
      }else{
        return new AnoterproductService();
      }
    },
    //工厂方法中传入的参数,必须是注册过的provicer.
    deps:["DEV","DEV_OBJ"]},
    {provide:"DEV", useValue:false}, //定义一个值类型的provider用于ProductService工厂方法的参数。
    {provide:"DEV_OBJ", useValue:{"dev":false}} //这个值类型是一个对象。
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
