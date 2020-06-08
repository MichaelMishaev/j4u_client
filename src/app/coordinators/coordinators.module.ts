import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { ReportsTableLinkComponent } from './general-report-table/reports-table-link/reports-table-link.component';
import { ReportsToolTipComponent } from './general-report-table/reports-tool-tip/reports-tool-tip.component';
import { RouterModule } from '@angular/router';
import { DeleteCandidateButtonComponent } from './find-job-candidate-table/delete-candidate-button/delete-candidate-button.component';

@NgModule({
  declarations: [
      ReportsTableLinkComponent,
      ReportsToolTipComponent,
      DeleteCandidateButtonComponent,
      ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  entryComponents: [ReportsTableLinkComponent, ReportsToolTipComponent, DeleteCandidateButtonComponent]
})
export class CoordinatorsModule { }
