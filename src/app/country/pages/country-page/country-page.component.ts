import { ActivatedRoute } from '@angular/router';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  countryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.params['countryCode'];

  countryResource = rxResource({
    request: () => ({ countryCode: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.countryCode);
    }
  });

}
