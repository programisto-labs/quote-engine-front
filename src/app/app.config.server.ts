import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideClientHydration } from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideServerRendering(),
  ]
};
console.log(
  "loaded app.config.server.ts"
)
export const config = mergeApplicationConfig(appConfig, serverConfig);
