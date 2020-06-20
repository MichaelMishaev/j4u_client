import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { UserService } from 'app/shared/user/user.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  constructor(private apiService: ApiService, private userService: UserService ) { }
  filterMessages = []
  jobCandidateByUser = []
  hasInvalidRows: boolean
  bonusAmount: number;
  allCandidatesCount: number;
  rejectedCandidatesCount: number;
  ngOnInit() {
    this.initUserStatusMessages();
    this.initCards();
  }
  initUserStatusMessages(){

    this.apiService.getjobCandidateHistoryByUser().subscribe((res: any)=>{
      this.filterMessages = res;
    });
  }
  initCards(){
    this.apiService.getJobCandidateByUser(this.userService.getCurrentUser().id).subscribe((res:any[]) =>{
      this.allCandidatesCount = res.length;
      this.rejectedCandidatesCount = res.filter(x=>x.IsInternalReject === 1).length;
      this.hasInvalidRows = this.jobCandidateByUser.filter(x=>x.IsInternalReject === 1).length > 0;
    });
    this.apiService.getBonusesByUser(this.userService.getCurrentUser().id).subscribe((res:any[]) =>{
      this.bonusAmount = res.reduce((sum, current) => sum + current.BonusAmount, 0)
    });

  }
  onSelect(e){

  }

}
