import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { ApiService } from 'app/shared/api/api.service';
import { UserService } from 'app/shared/user/user.service';
import { ReportsTableLinkComponent } from '../general-report-table/reports-table-link/reports-table-link.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'completed-report-table',
  templateUrl: './completed-report-table.component.html',
  styleUrls: ['./completed-report-table.component.scss']
})
export class CompletedReportTableComponent implements OnInit {

  constructor(private api: ApiService,private translate:TranslateService, private userService: UserService) { }
  source: LocalDataSource = new LocalDataSource();

  public settings = {
    pager: {
      display: true,
      perPage: 50
    },
    mode: 'inline',
    actions:false,

    columns: {
      candidateName: {
        title : 'שם מועמד',
        type: 'string',
        filter: true
      },
      Status: {
        title: 'סטטוס',
        type: 'string',
        filter: true,
        valuePrepareFunction: (status) => {
        
          return this.translate.instant(status);
        },

      },
      JobId: {
        title: 'מספר משרה',
        type: 'custom',
        filter: true,
        renderComponent: ReportsTableLinkComponent,
        valuePrepareFunction: (cell, row) => row
      },
      candidateEmail: {
        title: 'מייל מועמד',
        type: 'string',
        filter: true

      },
      candidatePhone: {
        title: 'טלפון מועמד',
        type: 'string',
        filter: true

      },
      fullName: {
        title: 'שם הסוכן',
        type: 'string',
        filter: true

      },
      Email: {
        title: 'מייל הסוכן',
        type: 'string',
        filter: true

      },
      PhoneNumber: {
        title: 'טלפון הסוכן',
        type: 'string',
        filter: true

      },
      CreatedAt: {
        title: 'תאריך עדכון',
        type: 'date',
        filter: false,
        // valuePrepareFunction: (date) => {
        //   if (date) {
        //   return new DatePipe('he-IL').transform(date, 'dd/MM/yyyy hh:mm');
        //   }
        //   return null;
        //   },
      },
      StartWorkDate: {
        title: 'תאריך תחילת עבודה',
        type: 'date',
        filter: false,
        valuePrepareFunction: (date) => {
          debugger;
          if (date) {
          return new DatePipe('he-IL').transform(date, 'dd/MM/yyyy');
          }
          return null;
          },
      },
      EndWorkDate: {
        title: 'תאריך סיום עבודה',
        type: 'date',
        filter: false,
        valuePrepareFunction: (date) => {
          if (date) {
          return new DatePipe('he-IL').transform(date, 'dd/MM/yyyy');
          }
          return null;
          },
      }

    },
  };
  ngOnInit() {
    const user = this.userService.getCurrentUser();
    this.api.getJobCandidateCompletedHistory().subscribe((data:any[]) =>{
      this.source.load(data);
    });
  }

}
