import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { Code404Component } from './code404/code404.component';
import { InfoComponent } from './info/info.component';
import { ProductDescComponent } from './product-desc/product-desc.component';
import { SellerInfoComponent } from './seller-info/seller-info.component';
import { ChatComponent } from './chat/chat.component';
import { LoginActivate } from './guard/loginActivate';
import { UnSaveGuard } from './guard/unsaveGuard';
import { ProductResolve } from './guard/productResolve';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', }, //重定向路由，当访问 / 时定向至 /home 路由。
  { path: 'chat', component: ChatComponent, outlet: 'aux' }, //辅助路由。

  //当用户访问根路径'/home'时。
  { path: 'home', component: HomeComponent, canActivate: [LoginActivate], canDeactivate:[UnSaveGuard] }, //在此路由上绑定了一个进入路由守卫,和离开路由守卫。记得要在providers中注册

  {
    path: 'product', component: ProductComponent, children: [ //当用户访问路径'/product'时。
      { path: '', component: ProductDescComponent }, //默认子路由.
      { path: 'seller/:id', component: SellerInfoComponent },
    ]
  },
   //带Rest full风格参数的路由。
  { path: 'productInfo/:id/:name/:age', component: InfoComponent, resolve:{product:ProductResolve}}, //在此路由上绑定了一个Resolve(用来在打开一个页面之前先获取数据)
  { path: '**', component: Code404Component } //当用户访问的页面不存在时，指定的页面。这句代码要放在路由的最后一条。
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginActivate,UnSaveGuard,ProductResolve]
})

export class AppRoutingModule { }