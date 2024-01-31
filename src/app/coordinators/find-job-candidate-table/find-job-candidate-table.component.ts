import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { DeleteCandidateButtonComponent } from './delete-candidate-button/delete-candidate-button.component';
import { ApiService } from 'app/shared/api/api.service';
import { ReportsTableLinkComponent } from '../general-report-table/reports-table-link/reports-table-link.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'find-job-candidate-table',
  templateUrl: './find-job-candidate-table.component.html',
  styleUrls: ['./find-job-candidate-table.component.scss']
})
export class FindJobCandidateTableComponent{
  searchInput: string;
  notFoundMessage = '';
  dataSource: LocalDataSource = new LocalDataSource();
  constructor(private api: ApiService, private translate: TranslateService) { }
  public settings = {
    pager: {
      display: true,
      perPage: 50
    },
    mode: 'inline',
    actions:false,

    columns: {
      IsFromPool: {
        title : 'סוג מועמד',
        type: 'custom',
        filter: false,
        renderComponent: DeleteCandidateButtonComponent,
        valuePrepareFunction: (cell, row) => row,
        onComponentInitFunction: (instance) => {
          instance.updateResult.subscribe(updatedUserData => {
            this.searchJobCandidates();
          });
        },
      },
      candidateName: {
        title : 'שם מועמד',
        type: 'string',
        filter: false
      },
      candidateMail: {
        title : 'דוא"ל מועמד',
        type: 'string',
        filter: false
      },
      candidatePhoneNumber: {
        title : 'טלפון מועמד',
        type: 'string',
        filter: false
      },
      JobId: {
        title: 'מספר משרה',
        type: 'custom',
        filter: false,
        renderComponent: ReportsTableLinkComponent,
        valuePrepareFunction: (cell, row) => row
      },
      jobName: {
        title : 'שם משרה',
        type: 'string',
        filter: false
      },
      CreateDate: {
        title: 'תאריך הגשה',
        type: 'date',
        filter: false,
        valuePrepareFunction: (date) => {
          if (date) {
          return new DatePipe('en-US').transform(date, 'dd/MM/yyyy');
          }
          return null;
          },
      },
      candidateStatus: {
        title : 'סטאטוס',
        type: 'string',
        filter: false,
        valuePrepareFunction: (status) => {
        
          return this.translate.instant(status);
        },

      },
      statusDescription: {
        title : 'הערות',
        type: 'string',
        filter: false
      },
      agentName: {
        title : 'שם הסוכן',
        type: 'string',
        filter: false
      },
      agentMail: {
        title : 'דוא"ל הסוכן',
        type: 'string',
        filter: false
      },
      agentPhoneNumber: {
        title : 'טלפון הסוכן',
        type: 'string',
        filter: false
      },
    }
  }

  searchJobCandidates(){
    this.notFoundMessage = '';
    this.api.searchJobCandidates({q: this.searchInput}).subscribe((data: any) => {
        this.dataSource.load(data);
    })
  }

}
