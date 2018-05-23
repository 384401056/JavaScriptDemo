import { Injectable } from '@angular/core'; // @Injectable() 装饰器告诉 Angular 这个服务本身可能拥有被注入的依赖。 
import { Hero } from '../model/Hero';
import { HEROES } from '../data/mock-heroes';
import { MessageService } from '../services/message.service';

// 导入rxjs
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES); // of(HEROES) 会返回一个 Observable<Hero[]>
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

}
