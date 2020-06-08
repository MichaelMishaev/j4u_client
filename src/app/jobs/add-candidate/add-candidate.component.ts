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
  candidatesForJobs: any[] = [];
  sentSuccessfulyText = '';
  user: any;
  @Output() addCandidateCompleted = new EventEmitter<string>();
  formatter1 = (result: { name: string,country:string }) => result.name;
  constructor(private apiService: ApiService, private userService: UserService,
              public activeModal: NgbActiveModal, private translate: TranslateService, 
              private toastr: ToastrService) { }

  ngOnInit() {
    
    this.getJobQuestions();
    this.user = this.userService.getCurrentUser();
    this.apiService.getCandidates().subscribe((data:any) => {
      this.candidatesForJobs = 
            data.map((i)=> {
                  return {
                    id: i.Id,
                    name: i.FirstName + ' ' + i.LastName + ' - ' + i.Email,
                    hasCv : i.HasCV === 1,
                    country: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
                  }}
                );
    });
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
  // if(!this.candidateForJob.HasCv){
  //   this.toastr.error(this.translate.instant('Have to add cv before sbumitting a candidate'))
  //   return;
  // }
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
  }, (err)=>{
    if(err.error && err.error.code === 'ER_DUP_ENTRY' ){
        this.toastr.error(this.translate.instant('Cant add the same candidate twice to the same job'))
    }else{
        this.toastr.error(this.translate.instant('An error occured. please try later'))
    }
  });
}

searchFlags = (text$: Observable<string>) =>

text$.pipe(
  debounceTime(200),
  map(term => term === '' ? []
    : this.candidatesForJobs.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
);


}
