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

  private heroes = [];

  constructor(private heroService: HeroService) {
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

}
