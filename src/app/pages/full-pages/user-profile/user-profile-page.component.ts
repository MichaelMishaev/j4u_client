import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'app/shared/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddJobComponent } from 'app/jobs/add-job/add-job.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormActionsComponent } from 'app/forms/layouts/form-actions/form-actions.component';
import { UserMessageComponent } from './user-message/user-message.component';
import { ApiService } from 'app/shared/api/api.service';
import { ToastrService } from 'ngx-toastr';
import{CoordinatorsTableComponent} from 'app/coordinators/coordinators-table/coordinators-table.component'

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {
  @ViewChild(CoordinatorsTableComponent, { static: false }) coordinatorsTable: CoordinatorsTableComponent;

  handleSearchEvent(searchTerm: string) {
    console.log('Search term from child component:', searchTerm);
    let searchValue= this.extractNumberAfterWord(searchTerm,'למשרה')
    debugger;
    if (searchValue === null || searchValue === undefined || searchValue.trim() === '') return; //dont go to child if no search condition

    this.coordinatorsTable.performSearch(searchValue);
    //this.coordinatorsTable.
    // Handle the event here (e.g., perform some action in response to the search)
  }

  // ngAfterViewInit(){
  //   this.onMessageClick('sds')
  // }
    currentUser: any;
    constructor(private userService: UserService,private modalService: NgbModal,
        private route: ActivatedRoute, private router:Router, private apiService: ApiService,private toastrService: ToastrService){

    }
    //Variable Declaration
    currentPage: string = "CoordinatorsTable"
    homeMessages = [];
    homeTimeMessages = [];
    selectedCandidate: string;

    isMinimized: boolean = false;

    toggleChat() {
      this.isMinimized = !this.isMinimized;
    }
    ngOnInit() {

        this.currentUser = this.userService.getCurrentUser()
        
        this.route.queryParams.subscribe(params => {
            if(params['p']){
                this.currentPage = params['p'];    
            }
          });
          this.apiService.getGeneralMessagesForCoordinators().subscribe((res: Array<{ Message: string, Date: string }>) => {
            this.homeMessages = res.map(item => item.Message);
            this.homeTimeMessages = res.map(item=> this.formatDateTime(item.Date))
          })
          
    }
    
     formatDateTime(datetimeStr: string): string {
      const date = new Date(datetimeStr);
  
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Zero-padding for month
      const day = ('0' + date.getDate()).slice(-2); // Zero-padding for day
      const hours = ('0' + date.getHours()).slice(-2); // Zero-padding for hours
      const minutes = ('0' + date.getMinutes()).slice(-2); // Zero-padding for minutes
  
      return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

   extractNumberAfterWord(inputStr: string, word: string): string | null {
    debugger;
    const regex = new RegExp(`${word}\\s+(\\d+)`, 'u');  // 'u' flag for Unicode cos the brackets
    const match = inputStr.match(regex);
    return match ? match[1] : null;
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