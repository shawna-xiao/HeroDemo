import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private heroesUrl = 'api/heroes';
  // 方法名（参数名：参数类型）：返回类型 {

  // }
  
  getHeros(): Observable<Hero[]> {
    //return Observable.of(HEROES);
    // get heroes from server
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `$(this.heroesUrl)/$(id)`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id = $(id)`)),
      catchError(this.handleError<Hero>(`getHero id = $(id)`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap(_ => this.log(`update id=$(hero.id)`)),
      catchError(this.handleError<any>('update'))
    );
  }

  private handleError<T>(opertions = 'opertions', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`$(opertions) failed: $(error.message)`);

      return Observable.of(result as T);
    }
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