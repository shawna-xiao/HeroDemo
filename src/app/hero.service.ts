import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs';

import { MessageService } from './message.service';

HttpHeaders
@Injectable()
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private heroesUrl = 'api/heroes';
  
  getHeros(): Observable<Hero[]> {
    //return Observable.of(HEROES);
    // get heroes from serve
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHerosById(id: number): Observable<Hero> {
    this.messageService.add('HeroService: fetched hero id=${id}');
    return Observable.of(HEROES.find(hero => hero.id === id));
  }

  /** Log a HeroService message with MessageService */
  private log(message: string) {
    this.messageService.add('HeroService' + message);
  }
  

}