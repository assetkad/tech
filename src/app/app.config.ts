import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [
        {
          path: '',
          loadComponent: () => import('./layout/layout.component'),
          loadChildren: () => import('./layout/layout.routes'),
        },
      ],
      withHashLocation()
    ),
  ],
};
