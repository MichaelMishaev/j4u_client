import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/shared/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-incorrect-report',
  templateUrl: './incorrect-report.component.html',
  styleUrls: ['./incorrect-report.component.scss']
})
export class IncorrectReportComponent implements OnInit {

  @Input() data: any;
  constructor(private dialogService: NgbModal,private toastr: ToastrService, private apiService: ApiService) { }
  fixedStatusDescription: string;
  jobCandidateId: string;
  ngOnInit() {
  }

  openModal(dialog, jobCandidateId, jobId){
     this.jobCandidateId = jobCandidateId;
     this.dialogService.open(dialog, {size:'lg'});
  }
  updateJobCandidateHistory(){
    const model = {
      jobCandidateId: this.jobCandidateId,
      StatusDescription: this.fixedStatusDescription
    }
    this.apiService.UpdateJobCandidateHistory(model).subscribe(res =>{
      this.toastr.success('עודכן בהצלחה');
    }, (err)=>{

       // this.sentSuccessfulyText = "אירעה שגיאה. נא לנסות מאוחר יותר";
    });
  }
  cancel(){
    this.dialogService.dismissAll();
  }
}
