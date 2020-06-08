import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-jobs-status',
  templateUrl: './jobs-status.component.html',
  styleUrls: ['./jobs-status.component.scss']
})
export class JobsStatusComponent implements OnInit {

  constructor(private dialogService: NgbModal,public activeModal: NgbActiveModal, 
    private apiService: ApiService, private translate:TranslateService, private toastr: ToastrService){}
  public rowData: any;
  public dialog: any;
  public jobsByUser:any;
  public currentJobId;
  jobQuestions: FormGroup;
  questions:any[];
  showUpdateQuestions = false;
  sentSuccessfulyText = '';
  ngOnInit(){

  }
  getCandidateJobQuestions(jobId:any){
    let currentJob = this.jobsByUser.find(x=>x.JobId == jobId);
    this.currentJobId = currentJob.Id;
    if(!currentJob.Questions){
      this.toastr.error(this.translate.instant('Job in not available at the moment'))
      return;
    }
    this.questions = currentJob.Questions.split(';');
    let answers = currentJob.QuestionsAndAnswers.split(',');
    let group={}
    answers.forEach((element, i) => {
      let fc = new FormControl(element.split(':').pop().replace(/"/g,''),[Validators.required]);
      if(i === this.questions.length){
        group["agentRemarks"] = fc;

      } else{
        group[i]= fc;

      }
    });


    group["confirmCandidate"] = new FormControl('');
    this.jobQuestions = new FormGroup(group);

    this.showUpdateQuestions = true;



  }
  updateJobCandidate(){
    if(!this.jobQuestions.valid || !this.jobQuestions.get('confirmCandidate').value){
      this.toastr.error(this.translate.instant("All fields are required"))
      return;
    }
    delete this.jobQuestions.value.confirmCandidate; //removes the confirm checkbox

    const model = {
      Id: this.currentJobId,
      QuestionsAndAnswers: JSON.stringify(this.jobQuestions.value)
    }
    this.apiService.updateJobCandidate(model).subscribe(res =>{
      this.toastr.success(this.translate.instant('Updated successfully'))

      this.showUpdateQuestions=false;
    }, (err)=>{

      this.toastr.error(this.translate.instant('An error occured. please try later'))
    });
  }
  openModal(dialog){
    this.apiService.candidateJobsByUser(this.rowData.Id).subscribe(res =>{
      this.jobsByUser = res;
      const modal = this.dialogService.open(dialog, {size:'lg'});
    })
  }
  goBack(){
    if(this.showUpdateQuestions){
      this.showUpdateQuestions=false;
    } else{
      this.dialogService.dismissAll();
    }
  }

}
