import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivatedAuthGuard } from './core/security-guard/auth.guard';

let routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  // { path: '**', loadChildren: './login/login.module#LoginModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterModule' },
  { path: 'accountActivation/:userId/:activationCode', loadChildren: './activation/activation.module#ActivationModule' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

