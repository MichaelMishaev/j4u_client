import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppliedCandidatesComponent } from './applied-candidates.component';
import { SharedModule } from 'app/shared/shared.module';
import { AppliedCandidatesRoutingModule } from './applied-candidates.routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [AppliedCandidatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppliedCandidatesRoutingModule,
    Ng2SmartTableModule
  ],
  entryComponents: []
})
export class AppliedCandidatesModule { }
