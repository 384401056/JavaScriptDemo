import { Injectable } from '@angular/core'; // @Injectable() 装饰器告诉 Angular 这个服务本身可能拥有被注入的依赖。 
import { Hero } from '../model/Hero';
import { HEROES } from '../data/mock-heroes';

// 导入rxjs
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES); // of(HEROES) 会返回一个 Observable<Hero[]>
  }
}
