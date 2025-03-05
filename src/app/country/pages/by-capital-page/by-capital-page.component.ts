import { CountryService } from './../../services/country.service';
import { Component, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';
@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  isLoading = signal<boolean>(false);
  isError = signal<string | null>(null);

  countries = signal<Country[]>([]);

  constructor(private countryService: CountryService) {}

  onSearch( term: string ): void {
    if ( !term || this.isLoading() ) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(term)
      .subscribe ( countries => {
        if (countries.length === 0) {
          this.isError.set(`No existe un país con esa capital: ${term}.`);
        }

        this.countries.set(countries);
        this.isLoading.set(false);
    });
  }

}
