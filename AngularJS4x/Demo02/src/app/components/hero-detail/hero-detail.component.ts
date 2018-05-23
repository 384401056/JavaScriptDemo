import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Hero } from '../../model/Hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute, // ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息。 这个组件对从 URL 中提取的路由参数感兴趣。 其中的 id 参数就是要现实的英雄的 id。
    private heroService: HeroService, // HeroService 从远端服务器获取英雄数据，本组件将使用它来获取要显示的英雄。
    private location: Location // location 是一个 Angular 的服务，用来与浏览器打交道。 稍后，你就会使用它来导航回上一个视图。
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    /**
     * route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。paramMap 是一个从 URL 中提取的路由参数值的字典。 "id" 对应的值就是要获取的英雄的 id。
     * 路由参数总会是字符串。 JavaScript 的 (+) 操作符会把字符串转换成数字，英雄的 id 就是数字类型。
     */
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(){
    this.location.back(); // 在浏览器的历史栈中后退一步。
  }
}
