import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import {LearnRoomComponent} from './learn-room.component'
import { LearnRoomRoutingModule } from './learn-room-routing.module';


@NgModule({
  declarations: [LearnRoomComponent],
  imports: [
    CommonModule,
    SharedModule,
    LearnRoomRoutingModule
  ]
})
export class LearnModule { }
