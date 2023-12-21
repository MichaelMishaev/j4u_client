import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {
  isSendToAll = false
  messageTxt: string;
  selectedCandidateId: any;

  constructor(private apiService: ApiService,private toastrService: ToastrService) { }
  ngOnInit() {
   
  }
  selectCandidate(candidate){
    debugger;
    this.selectedCandidateId = candidate.id;
  }
  sendToAllChecked(e){
    if(!e.target.checked){
      this.selectedCandidateId = null;
    }
  }
  sendMessage(){
    debugger;
    if(this.isSendToAll){
      this.apiService.addGeneralMessage({message:this.messageTxt}).subscribe(res=>{
        this.toastrService.success('Sent successfully');
        //todo close
      })
    } else{
      this.apiService.addNotifications({message:this.messageTxt, userId:this.selectedCandidateId}).subscribe(res=>{
        this.toastrService.success('Sent successfully');
        //todo close
      })
    }
  }

}
