import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddJobComponent } from 'app/jobs/add-job/add-job.component';
import { AddCandidateComponent } from 'app/jobs/add-candidate/add-candidate.component';
import { JobDetailsComponent } from 'app/jobs/job-details/job-details.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'app/shared/user/user.service';

@Component({
  selector: 'app-jobs-cards',
  templateUrl: './jobs-cards.component.html',
  styleUrls: ['./jobs-cards.component.scss']
})
export class JobsCardsComponent implements OnInit {

  @Input() filteredJobs: any[]
  @Input() isLoggedIn = false;
  @Output() addJobLoggedOut = new EventEmitter()
  job: any;
  isAllowedToEditJob = false;
  public isShowClosedJobs = false;
  constructor(private modalService: NgbModal, private translate: TranslateService, private userService: UserService,
     private toastr: ToastrService) { }

  ngOnInit() {
    const user = this.userService.getCurrentUser()
    this.isAllowedToEditJob = user && user.userType === 3
  }
  openJobDetailsModal(job){
    const modalRef = this.modalService.open(JobDetailsComponent);
    modalRef.componentInstance.job = job;
    modalRef.componentInstance.onAddCandidateClicked.subscribe((result)=>{
      
      modalRef.close()
      if(this.isLoggedIn){
        this.openAddCandidateModal(job)
      } else {
        this.emitAddJobLoggedOut(job.ID)
      }
      
    })
  }
  openAddCandidateModal(job){
    const modal = this.modalService.open(AddCandidateComponent)
    modal.componentInstance.job = job
    this.job = job;
    modal.componentInstance.addCandidateCompleted.subscribe((result)=>{
      modal.close();
    })

  }
  //todo move somewhere!!!
  openAddJobModal(e,job:any = {}){
    e.stopPropagation();
    const addJobModalRef = this.modalService.open(AddJobComponent);
    addJobModalRef.componentInstance.job = job;
  }

  emitAddJobLoggedOut(jobId){
    this.addJobLoggedOut.emit(jobId)
  }
  copyJobDetails(e,job){
    e.stopImmediatePropagation()
   
    var text = `${job.Title} - ${job.ID}
                ${job.Description}
                ${this.translate.instant('Areas')}: ${job.Locations}`
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.translate.get('Copied to clipboard!').subscribe(res=>{
    
      this.toastr.success(res)
    })
    }
}
