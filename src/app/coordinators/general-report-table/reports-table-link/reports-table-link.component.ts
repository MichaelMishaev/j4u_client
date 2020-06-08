import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-table-link',
  templateUrl: './reports-table-link.component.html',
  styleUrls: ['./reports-table-link.component.scss']
})
export class ReportsTableLinkComponent implements OnInit {

  public rowData: any;
  constructor() { }

  ngOnInit(): void {
  }
}
