import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { HerosComponent } from './components/heros/heros.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component'

const routes: Routes = [
  // 完成这些设置之后，路由器将会把 URL 匹配到 path: 'heroes'，并显示 HeroesComponent。
  { path: 'heroes', component: HerosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // 默认路由
];

@NgModule({
  exports: [RouterModule], // 导出 RouterModule 让路由器的相关指令可以在 AppModule 中的组件中使用。
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {

}


