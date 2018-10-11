import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResponseService } from './response/index';
import { HttpRequestConstants } from './provider/index';
import { CanActivatedAuthGuard } from './security-guard/index';
import { AuthService } from '../core/dataservice/auth.service'
import { ModalComponent, ModalService } from './modal/index'
import { SpinnerComponent, SpinnerService } from './spinner/index'
import { ExceptionService  } from './exception/index';
import { DataService  } from './dataservice/data.service';
import { ValidationService } from './validation/index';
import { ToastService } from './toast/toast.service';
import { ToastComponent } from './toast/toast.component';
import { EmitService } from './emit/emit.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CONFIG } from '../core/';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProgressServiceService } from './progress-bar/progress-service.service';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { GrowlModule } from 'primeng/components/growl/growl';




export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http);
}



@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule,DialogModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),GrowlModule],
  declarations: [ModalComponent,SpinnerComponent,ToastComponent, ProgressBarComponent],
  exports: [ModalComponent,SpinnerComponent,CommonModule,ToastComponent, FormsModule, RouterModule,ProgressBarComponent],
  providers:[ResponseService, HttpRequestConstants,AuthService,CanActivatedAuthGuard,
              ModalService,SpinnerService,ExceptionService,DataService,ValidationService,ToastService,EmitService,ProgressServiceService]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
       providers: []
    };
  }
}