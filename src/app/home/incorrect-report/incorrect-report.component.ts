import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-incorrect-report',
  templateUrl: './incorrect-report.component.html',
  styleUrls: ['./incorrect-report.component.scss']
})
export class IncorrectReportComponent implements OnInit {

  @Input() data: any;
  constructor(private dialogService: NgbModal) { }

  ngOnInit() {
  }

  openModal(dialog){
     this.dialogService.open(dialog, {size:'lg'});
  }
}
