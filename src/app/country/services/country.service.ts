import { Country } from './../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';

import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();

  searchByCapital( query: string ):Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
    .pipe(
      map( CountryMapper.mapRestCountryArrayToCountryArray ),
      tap( (countries) => this.queryCacheCapital.set(query, countries)),
      catchError( () => {
        return throwError(() => new Error('No se pudo obtener países con ese query'))
      })
    );
  }

  searchByCountry( query: string ) {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${ API_URL }/name/${ query }`)
    .pipe(
      map( CountryMapper.mapRestCountryArrayToCountryArray ),
      tap( (countries) => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError( () => {
        return throwError(() => new Error('No se pudo obtener países con ese nombre'))
      })
    );
  }

  searchCountryByAlphaCode( code: string ) {
    return this.http.get<RESTCountry[]>(`${ API_URL }/alpha/${ code }`)
    .pipe(
      map( CountryMapper.mapRestCountryArrayToCountryArray ),
      map( countries => countries[0]),
      delay(2000),
      catchError( () => {
        return throwError(() => new Error('No se pudo obtener países con ese código'))
      })
    );
  }

}
