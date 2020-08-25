import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CustomizerComponent } from './customizer/customizer.component';
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarDirective } from './directives/sidebar.directive';
import { SidebarLinkDirective } from './directives/sidebarlink.directive';
import { SidebarListDirective } from './directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from './directives/sidebartoggle.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TableModule } from 'primeng/table';
// import { SwitchComponent } from 'app/components/extra/switch/switch.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { JobsCardsComponent } from 'app/jobs-cards/jobs-cards.component';
import { UploadCvComponent } from 'app/candidates/upload-cv/upload-cv.component';
import { JobDetailsComponent } from 'app/jobs/job-details/job-details.component';
import { DownloadCvComponent } from 'app/candidates/download-cv/download-cv.component';
import { AddJobComponent } from 'app/jobs/add-job/add-job.component';
import { AddCandidateComponent } from 'app/jobs/add-candidate/add-candidate.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CandidateAutoCompleteComponent } from 'app/jobs/add-candidate/candidate-auto-complete/candidate-auto-complete.component';


@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CustomizerComponent,
        JobsCardsComponent,
        AddJobComponent,
        JobDetailsComponent,
        DownloadCvComponent,
        UploadCvComponent,
        AddCandidateComponent,
        CandidateAutoCompleteComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        NgbModule,
        TranslateModule,
        TableModule,
        SelectDropDownModule
    ],
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgbModule,
        TranslateModule,
        PerfectScrollbarModule,
        UiSwitchModule,
        TableModule,
        SelectDropDownModule,
        DeviceDetectorModule 

    ],
    entryComponents:[
        JobDetailsComponent, DownloadCvComponent,AddJobComponent
        ,AddCandidateComponent, CandidateAutoCompleteComponent
    ],
    providers:[
        NgbActiveModal
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CustomizerComponent,
        JobsCardsComponent,
        AddJobComponent,
        AddCandidateComponent,
        JobDetailsComponent,
        DownloadCvComponent,
        UploadCvComponent,
        // SwitchComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        SidebarLinkDirective,
        SidebarListDirective,
        SidebarAnchorToggleDirective,
        SidebarToggleDirective,
        CandidateAutoCompleteComponent
       
    ]
})
export class SharedModule { }
