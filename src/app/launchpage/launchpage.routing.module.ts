import {data} from '../core/resource/resource';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivatedAuthGuard } from '../core/security-guard/auth.guard';
import { LaunchpageComponent } from './launchpage.component';

const launchRoutes: Routes = [
    {
        path: '',  component: LaunchpageComponent, canActivate: [CanActivatedAuthGuard], data:{role:[1,2,3]}  
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(launchRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class LaunchPageRoutingModule { }
