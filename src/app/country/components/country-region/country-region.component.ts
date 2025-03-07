import { Component, output, signal } from '@angular/core';

import { Region } from './../../interfaces/region.type';

@Component({
  selector: 'country-region',
  imports: [],
  templateUrl: './country-region.component.html',
})
export class CountryRegionComponent {

  selectedRegion = signal<Region|null>(null);
  searchRegion = output<string>();

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  setRegion(region: Region) {
    this.searchRegion.emit(region)
  }
}
