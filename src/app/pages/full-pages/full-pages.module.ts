import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { HorizontalTimelineComponent } from './timeline/horizontal/component/horizontal-timeline.component';
import { VerticalTimelinePageComponent } from "./timeline/vertical/vertical-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';
import { CoordinatorsModule } from 'app/coordinators/coordinators.module';
import { CoordinatorsTableComponent } from 'app/coordinators/coordinators-table/coordinators-table.component';
import { SharedModule } from 'app/shared/shared.module';
import { GeneralReportTableComponent } from 'app/coordinators/general-report-table/general-report-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CompletedReportTableComponent } from 'app/coordinators/completed-report-table/completed-report-table.component';
import { FindJobCandidateTableComponent } from 'app/coordinators/find-job-candidate-table/find-job-candidate-table.component';


@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        NgbModule,
        SharedModule,
        CoordinatorsModule,
        Ng2SmartTableModule
        
    ],
    declarations: [       
        GalleryPageComponent,
        CoordinatorsTableComponent,
        GeneralReportTableComponent,
        CompletedReportTableComponent,
        FindJobCandidateTableComponent,
        InvoicePageComponent,       
        HorizontalTimelinePageComponent,
        HorizontalTimelineComponent,
        VerticalTimelinePageComponent,
        UserProfilePageComponent,
        SearchComponent,
        FaqComponent,
        KnowledgeBaseComponent
    ]
})
export class FullPagesModule { }
