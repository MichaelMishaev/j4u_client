import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Job } from '../jobs.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  job: Job;
  @Output() onAddCandidateClicked = new EventEmitter<any>()
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
