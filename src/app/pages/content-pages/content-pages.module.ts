import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { SharedModule } from 'app/shared/shared.module';
import { LoginCardComponent } from './login/login-card/login-card.component';
import { ArchwizardComponent } from 'app/forms/archwizard/archwizard.component';
import { ArchwizardModule } from 'angular-archwizard';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ContentPagesRoutingModule,
        FormsModule,
        ArchwizardModule      
    ],
    declarations: [
        ComingSoonPageComponent,
        ErrorPageComponent,
        ForgotPasswordPageComponent,
        LockScreenPageComponent,
        LoginPageComponent,
        MaintenancePageComponent,
        RegisterPageComponent,
        LoginCardComponent,
        ArchwizardComponent
    ]
})
export class ContentPagesModule { }
