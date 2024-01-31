import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { UserService } from 'app/shared/user/user.service';
import { data } from 'app/shared/data/smart-data-table';

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
   countData: number;
  @Input() data: any;
  ngOnInit() {
    this.initUserStatusMessages();
    this.initCards();
  }
  initUserStatusMessages(){

    this.apiService.getjobCandidateHistoryByUser().subscribe((res: any)=>{
      this.filterMessages = res.sort((a,b)=>{return new Date(b.CreatedAt).getTime()- new Date(a.CreatedAt).getTime()});
    });
  }

  initCards(){

    this.apiService.getCandidates().subscribe((data: any[])=>{
   
      this.allCandidatesCount = data.length;
      })
    this.hasInvalidRows = this.jobCandidateByUser.filter(x=>x.IsInternalReject === 1).length > 0;
    this.apiService.getBonusesByUser(this.userService.getCurrentUser().id).subscribe((res:any[]) =>{
      this.bonusAmount = res.reduce((sum, current) => sum + current.BonusAmount, 0)
    });

  }
  onSelect(e){

  }

}
