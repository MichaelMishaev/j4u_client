import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Job } from '../jobs.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/shared/user/user.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  job: Job;
  showCompanyDescription = false;
  @Output() onAddCandidateClicked = new EventEmitter<any>()
  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    this.showCompanyDescription = user.userType > 1;
  }

}
