import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { SummaryComponent } from './summary/summary.component';
import { TagInputModule } from 'ngx-chips';
import { IncorrectReportComponent } from './incorrect-report/incorrect-report.component';

@NgModule({
  declarations: [ HomeComponent, SummaryComponent, IncorrectReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    TagInputModule
  ],
  entryComponents: []
})
export class HomeModule { }
