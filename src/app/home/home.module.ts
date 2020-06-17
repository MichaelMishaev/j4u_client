import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { SummaryComponent } from './summary/summary.component';
import { TagInputModule } from 'ngx-chips';
import { IncorrectReportComponent } from './incorrect-report/incorrect-report.component';
import { ChatComponent } from './chat/chat.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SearchPipe } from 'app/shared/pipes/search.pipe';
import { UpdatesComponent } from './updates/updates.component';

@NgModule({
  declarations: [ HomeComponent, SummaryComponent, UpdatesComponent, IncorrectReportComponent, ChatComponent, SearchPipe],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    TagInputModule,
    PerfectScrollbarModule
  ],
  entryComponents: []
})
export class HomeModule { }
