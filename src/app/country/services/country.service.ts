import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, delay, map, of, throwError } from 'rxjs';

import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string ) {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
    .pipe(
      map( CountryMapper.mapRestCountryArrayToCountryArray ),
      delay(3000),
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
      delay(3000),
      catchError( () => {
        return throwError(() => new Error('No se pudo obtener países con ese nombre'))
      })
    );
  }

}
