import { Component, OnInit } from '@angular/core';
import { HerosComponent } from '../heros/heros.component';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../model/Hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      console.log(heroes);
      this.heroes = heroes.slice(0, 4); // 从已有的数组中返回选定的元素。
    }); 
  }

}
