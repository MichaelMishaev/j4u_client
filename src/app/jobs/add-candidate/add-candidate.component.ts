import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Job } from '../jobs.model';
import { ApiService } from 'app/shared/api/api.service';
import { UserService } from 'app/shared/user/user.service';
import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {
  job: Job;
  jobQuestions:FormGroup;
  candidateForJob: any;
  jobsQuestionsArr: any[];
  sentSuccessfulyText = '';
  user: any;
  @Output() addCandidateCompleted = new EventEmitter<string>();
  constructor(private apiService: ApiService, private userService: UserService,
              public activeModal: NgbActiveModal, private translate: TranslateService, 
              private toastr: ToastrService) { }

  ngOnInit() {
    
    this.getJobQuestions();
    this.user = this.userService.getCurrentUser();
  
  }
  candidateSelected(c){
    this.candidateForJob = c;
  }
  getJobQuestions(){
    let group={}
    this.jobsQuestionsArr = this.job.Questions.split(';').filter(x=>x);
    this.jobsQuestionsArr.forEach((item,i)=>{
        group[i]=new FormControl('',[Validators.required]);
    })


  group["confirmCandidate"] = new FormControl('')
  group["agentRemarks"] = new FormControl('')
  this.jobQuestions = new FormGroup(group);
}
submitAddCandidate(){
  if(!this.jobQuestions.valid || !this.jobQuestions.get('confirmCandidate').value || !this.candidateForJob){
      this.toastr.error(this.translate.instant('All fields are required'))
    return;
  }
  if(!this.candidateForJob.hasCv){
    this.toastr.error(this.translate.instant('Have to add cv before sbumitting a candidate'))
    return;
  }
  delete this.jobQuestions.value.confirmCandidate; //removes the confirm checkbox
  const model = {
    JobId: this.job.ID,
    JobName: this.job.Title,
    CandidateId: this.candidateForJob.id,
    UserId: this.user.id,
    QuestionsAndAnswers: this.jobQuestions.value
  }
  this.apiService.addJobCandidate(model).subscribe(() =>{
    
      this.toastr.success(this.translate.instant('Candidate submitted'))
    this.addCandidateCompleted.emit("done");
    this.activeModal.close();
  }, (err)=>{
    if(err.error && err.error.code === 'ER_DUP_ENTRY' ){
        this.toastr.error(this.translate.instant('Cant add the same candidate twice to the same job'))
    }else{
        this.toastr.error(this.translate.instant('An error occured. please try later'))
    }
  });
}



}
