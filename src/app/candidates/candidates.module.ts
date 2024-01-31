import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { CandidateRemarksComponent } from './candidate-remarks/candidate-remarks.component';
import { UploadCvComponent } from './upload-cv/upload-cv.component';
import { JobsStatusComponent } from './jobs-status/jobs-status.component';
import { CandidatesRoutingModule } from './candidates.routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [CandidatesComponent, CandidateRemarksComponent, JobsStatusComponent],
  imports: [
    CommonModule,
    SharedModule,
    CandidatesRoutingModule,
    Ng2SmartTableModule,
    
  ],
  entryComponents: [
    UploadCvComponent,
    CandidateRemarksComponent,
    JobsStatusComponent
  ]
})
export class CandidatesModule { }
