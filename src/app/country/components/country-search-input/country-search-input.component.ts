import { Component, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  searchText = output<string>();

  onSearch( term: string ): void {
    if ( term.length === 0 ) return;

    this.searchText.emit(term);
  }
}
