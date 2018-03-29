import { Component, OnInit } from '@angular/core';
import { Hero } from '../../model/Hero';
import { HEROES } from '../../data/mock-heroes';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  private hero: Hero;
  private selectedHero: Hero;
  private heroes = [];

  constructor(private heroService: HeroService) {
    this.hero = {
      id: 1,
      name: 'Windstorm'
    };

   }

  ngOnInit() {
    this.getHeroes();
  }

  /**
   * 通过服务获取数据。
   */
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  /**
   * 选择列表
   * @param hero 选中的对象。
   */
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
