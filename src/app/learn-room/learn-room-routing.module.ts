import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LearnRoomComponent} from './learn-room.component'
const routes: Routes = [
  {
    path: '',
    component: LearnRoomComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoomRoutingModule { }
