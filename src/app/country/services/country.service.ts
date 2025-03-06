import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, delay, map, Observable, of, throwError } from 'rxjs';

import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string ):Observable<Country[]> {
    query = query.toLowerCase();

    console.log(`Emitiendo valor: ${ query }`);

    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
    .pipe(
      map( CountryMapper.mapRestCountryArrayToCountryArray ),
      catchError( () => {
        return throwError(() => new Error('No se pudo obtener países con ese query'))
      })
    );
  }

  searchByCountry( query: string ) {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${ API_URL }/name/${ query }`)
    .pipe(
      map( CountryMapper.mapRestCountryArrayToCountryArray ),
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
