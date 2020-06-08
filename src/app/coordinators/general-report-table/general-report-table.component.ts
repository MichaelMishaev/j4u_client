import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { ReportsTableLinkComponent } from './reports-table-link/reports-table-link.component';
import { ReportsToolTipComponent } from './reports-tool-tip/reports-tool-tip.component';
import { ApiService } from 'app/shared/api/api.service';
import { UserService } from 'app/shared/user/user.service';

@Component({
  selector: 'general-report-table',
  templateUrl: './general-report-table.component.html',
  styleUrls: ['./general-report-table.component.scss']
})
export class GeneralReportTableComponent implements OnInit {

  constructor(private api: ApiService, private userService: UserService) { }
  sources: LocalDataSource[] = new Array<LocalDataSource>();
  candidateIds =  new Set<number>();
  isPageAllowed = false;

  public settings = {
    pager: {
      display: true,
      perPage: 50
    },
    mode: 'inline',
    actions:false,

    columns: {
      IsCoordinatorTreatment: {
        title : 'לטיפול',
        type: 'string',
        filter: true
      },
      JobId: {
        title: 'מספר משרה',
        type: 'custom',
        filter: true,
        renderComponent: ReportsTableLinkComponent,
        valuePrepareFunction: (cell, row) => row
      },
      Company_name: {
        title: 'שם חברה',
        type: 'string',
        filter: true
      },
      Title: {
        title: 'תיאור המשרה',
        type: 'string',
        filter: true

      },
      Status_Date: {
        title: 'תאריך',
        type: 'date',
        filter: false,
        valuePrepareFunction: (date) => {
          if (date) {
          return new DatePipe('en-US').transform(date, 'dd/MM/yyyy hh:mm');
          }
          return null;
          },
      },
      Status_Name: {
        title: 'סטטוס',
        type: 'custom',
        filter: true,
        renderComponent: ReportsToolTipComponent,
        valuePrepareFunction: (cell, row) => row

      },
      Candidate_Name: {
        title: 'שם המועמד',
        type: 'string',
        filter: true

      },
      Candidate_PhoneNumber: {
        title: 'טלפון מועמד',
        type: 'string',
        filter: true

      },
      Candidate_Email: {
        title: 'מייל מועמד',
        type: 'string',
        filter: true
      },
      Agent_Name: {
        title: 'שם הסוכן',
        type: 'string',
        filter: true

      },
      Agent_Email: {
        title: 'מייל הסוכן',
        type: 'string',
        filter: true

      },
      Agent_PhoneNumber: {
        title: 'טלפון הסוכן',
        type: 'string',
        filter: true

      },
      Recrutment_AgentName: {
        title: 'שם הרכז',
        type: 'string',
        filter: true
      },
      Status: {
        title: 'Opened/Closed',
        type: 'string',
        filter: false,
        valuePrepareFunction: (status) => {
          return status === 1 ? "Opened" : "Closed";
        },
      },
    },
  };
  ngOnInit() {
    const user = this.userService.getCurrentUser();

    this.isPageAllowed = user.userType > 1;

    this.api.getReportsTable().subscribe((data:any[]) =>{
      let allCandidateArr = {};
      data.forEach(i =>{
        i.IsCoordinatorTreatment = i.IsInternalReject == 2 ? 'Coordinator' : '';
        if(!allCandidateArr[i.Recrutment_AgentName]){
          allCandidateArr[i.Recrutment_AgentName] = [];
        }
        allCandidateArr[i.Recrutment_AgentName].push(i);
        this.candidateIds.add(i.Recrutment_AgentName);
      })
      this.candidateIds.forEach(c=>{
        let s = new LocalDataSource();

        s.load(allCandidateArr[c]);
        this.sources.push(s);
      })

    });
  }

}
