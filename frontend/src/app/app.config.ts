import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './Shared/Interceptor/jwt.interceptor';
import { loadingInterceptor } from './Shared/Interceptor/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([jwtInterceptor, loadingInterceptor])),
    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
    importProvidersFrom(NgxSpinnerModule, TimeagoModule.forRoot())
  ]
};
