export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
  nameInSpanish: string;
  translations: { [key: string]: Translation };
  region: string;
  subregion: string;
}

export interface Translation {
  official: string;
  common:   string;
}
