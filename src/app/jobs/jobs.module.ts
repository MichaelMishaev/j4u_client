import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs.routing.module';
import { JobsComponent } from './jobs.component';
import { SharedModule } from 'app/shared/shared.module';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';

@NgModule({
  declarations: [ JobsComponent],
  imports: [
    CommonModule,
    SharedModule,
    
    JobsRoutingModule,
  ],
  entryComponents: []
})
export class JobsModule { }
