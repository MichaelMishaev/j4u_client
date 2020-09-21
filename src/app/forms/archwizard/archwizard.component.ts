import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/shared/api/api.service';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { NgbModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { statesWithFlags } from './countries';



@Component({
  selector: 'app-archwizard',
  templateUrl: './archwizard.component.html',
  styleUrls: ['./archwizard.component.scss']
})
export class ArchwizardComponent implements OnInit {
  @Input() desiredJob:any;
  insertedCandidateId: any;
  jobsQuestionsArr:[];
  jobQuestions: FormGroup = new FormGroup({});
  candidateDetails: FormGroup = new FormGroup({});
  cvUploaded = false;
  constructor(private toastr: ToastrService, private apiService: ApiService,
    private parserFormatter: NgbDateParserFormatter, private dialogService:NgbModal) { }
  formatter1 = (x: { name: string }) => x.name;

 
  ngOnInit() {
    this.getJobQuestions();
    this.initCandidateDetailsForm();
  }

  getJobQuestions(){
    let group={}
    this.jobsQuestionsArr = this.desiredJob.Questions.split(';').filter(x=>x);
    this.jobsQuestionsArr.forEach((item,i)=>{
        group[i]=new FormControl('',[Validators.required]);
    })
    this.jobQuestions = new FormGroup(group);
  }
  initCandidateDetailsForm(){
    this.candidateDetails  = new FormGroup({
      'FirstName': new FormControl(null, [Validators.required]),
      'LastName': new FormControl(null, [Validators.required]),
      'City': new FormControl(null, [Validators.required]),
      'Email': new FormControl(null, [Validators.required, Validators.email]),
      'PhoneNumber': new FormControl(null, [Validators.required]),
      'HasCV': new FormControl(0),
      'Country': new FormControl(null, [Validators.required]),
      'CVDueDate': new FormControl(null, [Validators.required])
        //todo handle

     });
  }

  applyCandidate(){
   
    const obj = {...this.candidateDetails.value}
    obj.Country = this.candidateDetails.get('Country').value.name || ''
    obj.CVDueDate = this.parserFormatter.format(obj.CVDueDate);
    this.apiService.addExternalCandidate(obj, 1).subscribe((res:any) => {
      if(res && res.code === 'ER_DUP_ENTRY'){
        this.toastr.error("That candidate is allready been added by you")
        return
      } 
      this.insertedCandidateId = res.insertId
      const jobCandidate = {
        JobId:this.desiredJob.ID,
        CandidateId: res.insertId,
        QuestionsAndAnswers: this.jobQuestions.value,
        UserId:1,
        JobName: this.desiredJob.Title
      }
      //TODO : HANDLE DUPLICATE
      this.apiService.addExternalJobCandidate(jobCandidate).subscribe((res2:any)=>{
      }, (err)=>{
        if(err.error && err.error.code === 'ER_DUP_ENTRY'){
          this.toastr.error("You are allready been added to that job!")
        } else {
          this.toastr.error("An error occured. please try later")
        }
        this.dialogService.dismissAll()
        return

      })
    }, (err) => {
      this.toastr.error("An error occured. please try later")
    //  this.dialogService.dismissAll();
    })
  }
  onCvUploaded(fileExension){
    this.cvUploaded = true;
    if(fileExension){
      this.apiService.updateCandidateFileExtension({candidateId:this.insertedCandidateId,fileExension}).subscribe(res=>{
        
    });

    }
  }

  finishQuickApply(){
    this.toastr.success("You have been submitted, we will contact you shortly")
    this.dialogService.dismissAll();
  }

   // Flag search
   searchFlags = (text$: Observable<string>) =>
   text$.pipe(
     debounceTime(200),
     map(term => term === '' ? []
       : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
   );
}
