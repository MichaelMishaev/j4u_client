import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppliedCandidatesComponent } from './applied-candidates.component';

const routes: Routes = [
    {
      path: '',
      component: AppliedCandidatesComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AppliedCandidatesRoutingModule { }
  