import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  placeholder = input<string>('Buscar');

  searchText = output<string>();

  inputValue = signal<string>('');

  // Efecto que permite esperar un tiempo de 1 segundo antes de emitir el output. La función onClenUp permite cancelar el timeout si hubo otra invocación al efecto.
  debounceEffect = effect((onCleanUp) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.searchText.emit(value);
    }, 1000);

    onCleanUp( () => {
      // Función que permite cancelar el timeout
      clearTimeout(timeout);
    })
  } );

  onSearch( term: string ): void {
    if ( term.length === 0 ) return;

    this.searchText.emit(term);
  }
}
