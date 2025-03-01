import { Routes } from "@angular/router";
import { ByCapitalPageComponent } from "./pages/by-capital-page/by-capital-page.component";

export const countryRoutes: Routes = [
  {
    path: '',
    component: ByCapitalPageComponent
  },
  // {
  //   path: 'country',

  //   // Definición de rutas de otro archivo de rutas.
  // },
  {
    path: '**',
    redirectTo: ''
  }
];

export default countryRoutes;
