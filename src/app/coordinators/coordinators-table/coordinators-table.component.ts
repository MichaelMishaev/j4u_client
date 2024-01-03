import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/shared/user/user.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'coordinators-table',
  templateUrl: './coordinators-table.component.html',
  styleUrls: ['./coordinators-table.component.scss'],
})

export class CoordinatorsTableComponent implements OnInit {

  // @Input() selectedCandidate: string;
  @Output() searchEvent = new EventEmitter<string>();
  
  

  performSearch(searchTerm: string) {
    console.warn('search emitted')
    this.searchEvent.emit(searchTerm);
    this.filterResWithParam(searchTerm)
    // You can also implement internal search logic here if needed
  }
  public statusConfig = {
    displayKey:"translated", //if objects array passed which key to be displayed defaults to description
    height: '350px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Status',
  }
  public coordinatorsConfig = {
    displayKey:"fullName",
    height: '350px',
    placeholder:'שייך רכז',
  }
  isPageAllowed = false;
  user:any;
  cols: any[];
  searchInput: any;
  tableData: any[] = [];
  coardinatorsList: any[] = [];
  filteredTableData: any[] = [];
  jobId:any;
  jobCandidateId:any;
  startWorkDate: any;
  questions: any;
  historyData: any;
  jobAcceptData : any;
  public statusOptions = [];
  constructor(private apiService: ApiService,private route: ActivatedRoute, 
            public activeModal: NgbActiveModal, private translate: TranslateService,
            private dialogService:NgbModal , private toastrService: ToastrService, private userService: UserService) {
    this.cols = [
      { field: 'Title', header: 'Title' },
      { field: 'ExternalJobId', header: 'Job id' },
      { field: 'CompanyDescription', header: 'Company name' },
      { field: 'candidatesCount', header: 'Total candidates' },
      { field: 'isRead', header: 'Total unread candidates' },
      { field: 'coardinatorName', header: 'Coordinator name' }
    ];
    this.route.queryParams.subscribe(params => {
      this.jobId = params['j'];
      this.jobCandidateId = params['jc'];
    });
}


  ngOnInit() {

    console.log('asdasd')

    this.user = this.userService.getCurrentUser();
    this.isPageAllowed = this.user.userType > 1;
    if(this.user.userType === 3){
      this.apiService.getUserManagers().subscribe((res:any) =>{
        this.coardinatorsList = res;
        this.getTableData();
      });
    } else{
      this.getTableData();
    }
  }
  getTableData(){
    this.tableData = [];
    this.apiService.getcoordinatorsTable(true).subscribe((res:any)=>{
      var idsObj = {};
      if(res && res.length > 0){
        res.forEach(element => {
          element.prevStatus = element.Status;
          element.prevStatusDescription = element.StatusDescription;
          element.prevInternalRemarks = element.InternalRemarks;

          if(!idsObj[element.JobId]){
            var coardinatorObj = (this.coardinatorsList.find(x=>x.id === element.JobUserId) as any)
            var coardinatorName = coardinatorObj ? coardinatorObj.fullName : '';
            idsObj[element.JobId] = element.JobId;
            var candidatesCount = res.filter(x=>x.JobId === element.JobId && element.fullName !== null).length;
            var isRead = res.filter(x=>x.JobId === element.JobId && x.IsRead &&  x.IsRead.data[0] == 0).length;
            var obj = { JobId:  element.JobId,CompanyDescription:element.CompanyDescription,ExternalJobId:element.ExternalJobId, Title :element.Title,
                       candidatesCount, isRead,coardinatorName,Description:element.Description, data : [element]}

            this.tableData.push(obj)
          } else{
            var row = this.tableData.find(x =>x.JobId === element.JobId);
            row.data.push(element);
          }
          element.IsRead = element.IsRead ? element.IsRead.data[0] == 0 : 1;

        });
        this.tableData = this.tableData.sort((a,b)=> (a.isRead > b.isRead) ? -1 : 1)
        this.filteredTableData = this.tableData;
      }
      if(this.jobId)
      setTimeout(() => {
        var elem = document.getElementById(this.jobId);
        if(elem){
          elem.click();
          if(this.jobCandidateId)
          setTimeout(() => {
            var elem2 = document.getElementById(this.jobCandidateId);
            elem2.scrollIntoView(false);
            elem.scrollTop -= 50;
          }, 1000);
        }

      },1000);
    })
    //todo cache
    this.apiService.getLookups().subscribe((res: any) =>{
      this.statusOptions = res.jobStatus.map(x => {
        return {id:x.ID, description: x.Name, translated: this.translate.instant(x.Name)};
      });
    })
  }
  saveRow(rowData,startDateDialog){
    if(this.isShowDatePopUp(rowData.Status)) {
      const modalRef = this.dialogService.open(startDateDialog);
      this.jobAcceptData = rowData;
      modalRef.componentInstance.data = rowData
     

    } else{
      this.updateJobCandidateStatus(rowData)
    }
  }c
  isShowDatePopUp(status){
    return status && status.id && (status.id === 6 || status.id === 12)
  }
  updateJobCandidateStatus(rowData){
    if(rowData.Status==undefined){
      rowData = this.jobAcceptData;
    }
    rowData.prevStatus = rowData.Status;
    rowData.prevStatusDescription = rowData.StatusDescription;
    rowData.prevInternalRemarks = rowData.InternalRemarks;

    rowData.startWorkDate = this.startWorkDate;
    this.apiService.updateJobCandidateStatus(rowData).subscribe(res=>{
      this.toastrService.success('Updated successfuly');
      this.startWorkDate = '';
      this.closeModal();

    })
  }
  onCvDownloaded(jobCandidateId){
    this.apiService.updateJobCandidateIsRead({jobCandidateId}).subscribe(res=>{
     // this.getTableData();
    })
  }
  showQuestions(questionsDialog, rowData){
    var questions =  rowData.Questions.split(';');
    var questionsAndAnswers = JSON.parse(rowData.QuestionsAndAnswers);
    var resArr = [];
    var questionsModalObj = {agentRemarks : '', tableData:[]};
    if(questions){
      questions.forEach((q,i) => {
          if(questionsAndAnswers[i]){
            resArr.push({q:q,a:questionsAndAnswers[i]})
          }
      });
      if(questionsAndAnswers["agentRemarks"]){
        questionsModalObj.agentRemarks = questionsAndAnswers["agentRemarks"]
      }
      questionsModalObj.tableData = resArr;
      this.questions = questionsModalObj;
    }
    const modalRef = this.dialogService.open(questionsDialog);
  }
  jobUserChanged(e, rowData){
    let coordinatorName = e.target.value;
    let userId = this.coardinatorsList.find(x=>x.fullName === coordinatorName).id;
    let jobId = rowData.JobId;
    this.apiService.updateJobUserId({jobId,userId}).subscribe(res=>{
      this.toastrService.success('Updated successfuly');
    })
  }
  showHistory(historyDialog, jobCandidateId){
    this.apiService.getJobCandidateHistory(jobCandidateId).subscribe(res=>{
      this.historyData = res;
      this.dialogService.open(historyDialog);
    })
  }
  openIsKnownModal(knownDialog, candidateId){
    this.apiService.getKnownCandidateHistory(candidateId).subscribe(res=>{
      
      const modalRef = this.dialogService.open(knownDialog);
    })
  }

  filterResWithPredicate(jobId: string){
    console.log('insidePredicate')
    if(jobId.length > 1){
      this.filteredTableData = this.tableData.filter(x=>x.ExternalJobId == this.searchInput 
        || x.Title.indexOf(this.searchInput) > -1
        || x.CompanyDescription.indexOf(this.searchInput) > -1)

    }
  }

  filterResWithParam(val:string){
    debugger;
    this.searchInput = val;
    if(this.searchInput.length > 1){
      this.filteredTableData = this.tableData.filter(x=>x.ExternalJobId == this.searchInput 
        || x.Title.indexOf(this.searchInput) > -1
        || x.CompanyDescription.indexOf(this.searchInput) > -1)

    }
  }


  filterRes(){
    if(this.searchInput.length > 1){
      this.filteredTableData = this.tableData.filter(x=>x.ExternalJobId == this.searchInput 
        || x.Title.indexOf(this.searchInput) > -1
        || x.CompanyDescription.indexOf(this.searchInput) > -1)

    }
  }
  clearFilter(){
    this.searchInput = '';
    this.filteredTableData = this.tableData;
  }
  relevantCheckboxChanged(e,rowData){
    if(e.target.checked ){
      rowData.allData = rowData.data;
      rowData.data = rowData.data.filter(x=> this.isRelevantStatus(x.Status) )
    } else {
      rowData.data = rowData.allData;
    }
  }

  isRelevantStatus(status){
    debugger;
    var ee = this.translate.instant('Cooks');
    return status === this.translate.instant('New')  || status === this.translate.instant('Resume sent')
    || status === this.translate.instant('Missing details') || status === this.translate.instant('An interview was scheduled')
    || status === this.translate.instant('Waiting for work to begin')
    || status === this.translate.instant('Waiting for reply from candidate')
  }
  closeModal(){
    this.dialogService.dismissAll()
  }
}
