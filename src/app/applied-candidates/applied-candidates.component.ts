import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { DatePipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from 'app/shared/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-applied-candidates',
  templateUrl: './applied-candidates.component.html',
  styleUrls: ['./applied-candidates.component.scss']
})
export class AppliedCandidatesComponent implements OnInit {
  renderTable = false;
  constructor(private api: ApiService, private userService: UserService,
              private toastr: ToastrService, private translate: TranslateService) { }
  source: LocalDataSource = new LocalDataSource();

  public settings = {
    pager: {
      display: true,
      perPage: 50
    },
    mode: 'inline',

    delete: {
      deleteButtonContent: '<i class="ft-trash font-medium-3"></i>',
      confirmDelete: true,
    },
    actions:{
      delete: true,
      add: false,
      edit: false,
      columnTitle: "Delete"
    },

    columns: {
      IsInternalReject: {
        title: 'Needs treatment?',
        type: 'string', filter: true,
        valuePrepareFunction: (row) => {
          return row == 1 ? 'V': 'X'
         },

      },
      CandidateName: {
        title: 'Candidate Name',
        type: 'string', filter: true

      },
      JobId: {
        title: 'Job id',
        type: 'string', filter: true
      },
      Title: {
        title: 'Title',
        type: 'string', filter: true
      },
      Status: {
        title: 'Status',
        type: 'string', 
        valuePrepareFunction: (status) => {
        
          return this.translate.instant(status);
        },
          filter: true
      },
      StatusDescription: {
        title: 'Description',
        type: 'string', filter: true
      },
      Commission: {
        title: 'Commission',
        type: 'string', filter: true
      },
      updated_at: {
        title: 'Updated at',
        type: 'date',
        valuePrepareFunction: (date) => {
          if (date) {
          return new DatePipe('en-UK').transform(date, 'dd/MM/yyyy');
          }
          return null;
          },
     filter: false
      },

    },
  };
  ngOnInit() {
    this.api.getJobCandidateByUser(this.userService.getCurrentUser().id).subscribe((data:any[]) =>{
      Object.keys(this.settings.columns).forEach(key => {
        this.settings.columns[key].title = this.translate.instant(this.settings.columns[key].title)
      });
      this.source.load(data);
      this.renderTable = true;

    });
  }
  onDeleteConfirm(event): void {
    if (window.confirm(this.translate.instant('Are you sure you want to delete?'))) {
      this.api.deleteJobCandidate(event.data.JobCandidateId).subscribe(() => {
        event.confirm.resolve();
        this.toastr.success(this.translate.instant('Deleted successfully'))

      })
    } else {
      event.confirm.reject();
    }
  }


}
