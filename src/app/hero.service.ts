import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs';

import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  getHeros(): Observable<Hero[]> {
    return Observable.of(HEROES);
  }

  getHerosById(id: number): Observable<Hero> {
    this.messageService.add('HeroService: fetched hero id=${id}');
    return Observable.of(HEROES.find(hero => hero.id === id));
  }

  constructor(private messageService: MessageService) { }

}