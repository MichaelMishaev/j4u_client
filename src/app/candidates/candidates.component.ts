import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { LocalDataSource } from 'ng2-smart-table';
import { CandidateRemarksComponent } from './candidate-remarks/candidate-remarks.component';
import { UploadCvComponent } from './upload-cv/upload-cv.component';
import { DownloadCvComponent } from './download-cv/download-cv.component';
import { JobsStatusComponent } from './jobs-status/jobs-status.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as hopscotch from 'hopscotch';
import { NbSearchService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  settings = {
    pager: {
      display: true,
      perPage: 50
    },
    mode: 'external',
    add: {
      confirmCreate:true,
      addButtonContent: '<div class="add-candidate-btn"><i class="ft-plus info font-medium-1 mr-2"></i></div>',
      createButtonContent: '<i class="ft-save info font-medium-1 mr-2"></i>',
      cancelButtonContent: '<i class="ft-delete info font-medium-1 mr-2"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>',
      saveButtonContent: '<i class="ft-save info font-medium-1 mr-2"></i>',
      cancelButtonContent: '<i class="ft-delete info font-medium-1 mr-2"></i>',
    },
    actions:{
      delete: false,
      columnTitle: "Actions"
    },

    columns: {

      FirstName: {
        title: 'First name',
        type: 'string',
        filter: false

      },
      LastName: {
        title: 'Last name',
        type: 'string', filter: false
      },
      City: {
        title: 'Address',
        type: 'string', filter: false
      },
      Email: {
        title: 'Email',
        type: 'email', filter: false
      },
      PhoneNumber: {
        title: 'PhoneNumber',
        type: 'number', filter: false, editable: false
      },
      remarks: {
        title: 'Remarks',
        type: 'custom',
        renderComponent: CandidateRemarksComponent,
        valuePrepareFunction: (cell, row) => row,
        filter:false,addable: false,editable: false
      },
      cvUpload: {
        title: 'Upload CV',
        type: 'custom',
        renderComponent: UploadCvComponent,
        valuePrepareFunction: (cell, row) => row,
        onComponentInitFunction: (instance) => {
          //todo fix
          instance.updateResult.subscribe(updatedUserData => {
            this.handleUpdatedUser(updatedUserData);
          });
        },
        filter:false,addable: false,editable: false
      },
      cvDowload: {
        title: 'Download CV',
        type: 'custom',
        renderComponent: DownloadCvComponent,
        valuePrepareFunction:(cell,row)=> row,
        filter:false, addable: false,editable: false
      },
      jobsStatus: {
        title: 'Watch jobs',
        type: 'custom',
        renderComponent: JobsStatusComponent,
        valuePrepareFunction: (cell, row) => row,
        filter:false, addable: false,editable: false
      },
    },
  };
  renderTable = false;
  source: LocalDataSource = new LocalDataSource();
  uploadedFiles: any;
  allCandidates: any[];
  filteredCandidates: any[];
  insertedCandidateId: any;
  addCandidateForm: FormGroup;
  constructor(private api: ApiService,public dialogService: NgbModal,
          private searchService: NbSearchService, private translate: TranslateService, private toastr: ToastrService) { //private service: SmartTableData,
    
  }
  ngOnInit(): void {
    this.api.getCandidates().subscribe((data: any[])=>{
      if(data.length > 5){
        this.settings.columns.FirstName.filter = true;
        this.settings.columns.LastName.filter = true;
        this.settings.columns.City.filter = true;
        this.settings.columns.Email.filter = true;
        this.settings.columns.PhoneNumber.filter = true;
       
      }
      Object.keys(this.settings.columns).forEach(key => {
        this.settings.columns[key].title = this.translate.instant(this.settings.columns[key].title)
      });
      this.allCandidates = data;
      this.filteredCandidates = this.allCandidates;
      this.source.load(this.filteredCandidates);
      this.renderTable = true;
    });

    this.searchService.onSearchSubmit()
    .subscribe((data: any) => {
      if(!data){
        this.filteredCandidates = this.allCandidates;
      }
      const t = data.term.toLowerCase();
      this.filteredCandidates = this.allCandidates.filter(x=>x.FirstName.toLowerCase().indexOf(t) > -1 || x.LastName.toLowerCase().indexOf(t) > -1 || x.Id == t || x.Email === t || x.PhoneNumber === t);
      this.source.load(this.filteredCandidates);
    }) 
   }
   onAddSelect(dialog,obj) { 
    const data = obj ? obj.data : {}
    this.addCandidateForm  = new FormGroup({
  
      'FirstName': new FormControl(data.FirstName || null, [Validators.required]),
      'LastName': new FormControl(data.LastName || null, [Validators.required]),
      'City': new FormControl(data.City || null, [Validators.required]),
      'Email': new FormControl(data.Email || null, [Validators.required, Validators.email]),
      'PhoneNumber': new FormControl(data.PhoneNumber || null, [Validators.required])
     });
     if(data){
      this.insertedCandidateId= data.Id;
      this.addCandidateForm['Id'] =  new FormControl(data.Id, [Validators.required]);
      this.addCandidateForm['HasCv'] = new FormControl(data.HasCv);
      this.addCandidateForm['FileExtension'] =  new FormControl(data.FileExtension);
     }
     const modal = this.dialogService.open(dialog, {size:'lg', backdrop : 'static',
     keyboard : false
    });
    }
  
    onCreateConfirm(e){
      if(!this.isFieldsValid()){
        return
      }
      const data = this.addCandidateForm.value
      data.PhoneNumber = data.PhoneNumber.replace(/-/gi,'');

      this.api.addCandidate(data).subscribe((res:any) => {
        if(res && res.code === 'ER_DUP_ENTRY'){
          this.toastr.error(this.translate.instant("Cant add the same candidate twice"))
        } else {
          data.Id = res.insertId;
          this.insertedCandidateId = res.insertId;
          this.filteredCandidates.unshift(data)
          this.source.load(this.filteredCandidates);
         
        }
      })
  }
  onCvUploaded(){
    this.toastr.success(this.translate.instant("Candidate Added Succesfully"))
    this.dialogService.dismissAll()
  }
  onSaveConfirm(e){
    if(!this.isFieldsValid()){
      return
    }
    const data = this.addCandidateForm.value
    data.PhoneNumber = data.PhoneNumber.replace(/-/gi,'');
    this.api.updateCandidate(data).subscribe(() => {
      e.confirm.resolve();
    })
  }
  onDeleteConfirm(event): void {
    if (window.confirm(this.translate.instant('Are you sure you want to delete?'))) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  startTour() {
    // Destroy running tour
    hopscotch.endTour(true);
    // Initialize new tour 
    hopscotch.startTour(this.tourSteps());
  }

  tourSteps(): any {
    return {
      id: 'demo-tour',
      showPrevButton: true,
      steps: [

        {
          title: this.translate.instant("Add candidate"),
          content: this.translate.instant("Add candidate"),
          target: "div.add-candidate-btn",
          placement: "right"
        },
        {
          title: this.translate.instant("Upload CV"),
          content: this.translate.instant("You must upload CV"),
          target: "th.cvUpload",
          placement: "left"
        },
        {
          title: this.translate.instant("Apply"),
          content: this.translate.instant("Apply the candidate for one of our jobs"),
          target: "menu-item-0",
          placement: "bottom"
        }
      ],
      i18n: {
        doneBtn: this.translate.instant("Done"),
        prevBtn: this.translate.instant("Back"),
        nextBtn: this.translate.instant("Next"),
      }
    }
  }

  private isFieldsValid(): boolean{
    if(!this.addCandidateForm.value.FirstName){
      this.toastr.error(this.translate.instant("First name is required"))
      return false;
    }
    if(!this.addCandidateForm.value.LastName){
      this.toastr.error(this.translate.instant("Last name is required"))
      return false;
    }
    if(!this.addCandidateForm.value.City){
      this.toastr.error(this.translate.instant("Address is required"))
      return false;
    }
    if(!this.addCandidateForm.value.PhoneNumber){
      this.toastr.error(this.translate.instant("Phone number is required"))
      return false;
    }
    var rgx = new RegExp("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")
    if(this.addCandidateForm.value.Email && !rgx.test(this.addCandidateForm.value.Email)){
      this.toastr.error(this.translate.instant("Email is invalid"))
      return false;
    }
    return true;
  }
  private handleUpdatedUser(updatedUserData: any) {
    this.source.refresh();
  }

}
