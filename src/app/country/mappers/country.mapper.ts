import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper
{

  static mapRestCountryToCountry( restCountry: RESTCountry ): Country {
    return {
      cca2: restCountry.cca2,
      capital: restCountry.capital ? restCountry.capital.join(',') : 'No capital',
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      population: restCountry.population,
      nameInSpanish: restCountry.translations['spa'].common ?? 'No Spanish name',
      translations: restCountry.translations,
      region: restCountry.region,
      subregion: restCountry.subregion,
    };
  }

  static mapRestCountryArrayToCountryArray(items: RESTCountry[]): Country[] {
    return items.map( CountryMapper.mapRestCountryToCountry );
  }
}
