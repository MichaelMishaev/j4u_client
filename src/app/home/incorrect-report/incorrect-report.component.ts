import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-incorrect-report',
  templateUrl: './incorrect-report.component.html',
  styleUrls: ['./incorrect-report.component.scss']
})
export class IncorrectReportComponent implements OnInit {

  constructor(private dialogService: NgbModal) { }

  ngOnInit() {
  }

  openModal(dialog){
     this.dialogService.open(dialog, {size:'lg'});
  }
}
