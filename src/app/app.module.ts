import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing.module'
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { ActivationModule } from './activation/activation.module';
import { RefreshService } from './core/dataservice/refresh.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { socialAcc } from './core/config/config';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.txt');
}

let providers = {
  "google": {
    "clientId": socialAcc.google
  },
  "facebook": {
    "clientId": socialAcc.facebook,
    "apiVersion": "v2.5" //like v2.4 
  }
};


@NgModule({
  declarations: [

    AppComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    LoginModule,
    RegisterModule,
    SharedModule,
    BrowserAnimationsModule,
    Angular2SocialLoginModule,
    ActivationModule,  
        TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    
    CoreModule.forRoot()

  ],
  providers: [RefreshService],
  bootstrap: [AppComponent]
})

export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
