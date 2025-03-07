import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryRegionComponent } from "../../components/country-region/country-region.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, CountryRegionComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);
  query = signal('');

  // Implementación con rxResource
  countryResource = rxResource({
      request: () => ({ query: this.query() }),
      loader: ({ request }) => {
        if (!request.query) return of([])

        return this.countryService.searchCountryByRegion( request.query );
      }
    });


}
