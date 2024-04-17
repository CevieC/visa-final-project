import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    HttpClientModule,
    provideAnimationsAsync(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
};