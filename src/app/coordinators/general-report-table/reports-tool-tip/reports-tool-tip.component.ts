import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-tool-tip',
  templateUrl: './reports-tool-tip.component.html',
  styleUrls: ['./reports-tool-tip.component.scss']
})
export class ReportsToolTipComponent implements OnInit {

  public rowData: any;
  public isExist = false;
  constructor() { }

  ngOnInit() {
    this.isExist = this.rowData.InternalRemarks && this.rowData.InternalRemarks != 'null'
  }

}
