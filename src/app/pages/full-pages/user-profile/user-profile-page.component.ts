import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddJobComponent } from 'app/jobs/add-job/add-job.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormActionsComponent } from 'app/forms/layouts/form-actions/form-actions.component';
import { UserMessageComponent } from './user-message/user-message.component';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {
    currentUser: any;
    constructor(private userService: UserService,private modalService: NgbModal,
        private route: ActivatedRoute, private router:Router){

    }
    //Variable Declaration
    currentPage: string = "CoordinatorsTable"

    ngOnInit() {
        this.currentUser = this.userService.getCurrentUser()
        
        this.route.queryParams.subscribe(params => {
            if(params['p']){
                this.currentPage = params['p'];    
            }
          });
    }

    showPage(page: string) {
        this.currentPage = page;
        this.router.navigate(
            [], 
            {
              relativeTo: this.route,
              queryParams: { p: page }, 
              queryParamsHandling: 'merge',
            });
    }

    openAddJob(job = {}){
        const modal = this.modalService.open(AddJobComponent, {
            backdrop : 'static',
            keyboard : false
          })
        modal.componentInstance.job = job
    }
    openAddMessage(){
        const modal = this.modalService.open(UserMessageComponent)
    }
}