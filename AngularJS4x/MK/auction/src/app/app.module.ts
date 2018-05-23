import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { StarComponent } from './star/star.component';
import { HomeComponent } from './home/home.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';

//在创建项目时，没有使唤用 --routing。所以这里要手动生成路由配置，并且记得在下面的imports中注册配置。
const routeConfig: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full', },
  { path: '', component:HomeComponent},
  { path: 'detail/:prodTitle', component:ProductdetailComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StarComponent,
    HomeComponent,
    ProductdetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
