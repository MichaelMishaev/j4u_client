import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/shared/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

    jobs:any[];
    desiredJob: any;
    @ViewChild('registerFirst', {static: false}) registerFirst: TemplateRef<any>;
    @ViewChild('quickApply', {static: false}) quickApply: TemplateRef<any>;
    @ViewChild('loginModal', {static: false}) loginModal: TemplateRef<any>;
    constructor(private route: ActivatedRoute,public dialogService: NgbModal,private router: Router, private apiService: ApiService) {      
    }

    ngOnInit(){
      this.apiService.getJobsBase().subscribe((res: any[]) => {
        this.jobs = res;
      })
      if(window.localStorage.getItem("openLogin")){
          setTimeout(() => {
            window.localStorage.removeItem("openLogin")
            this.openLogin()

          }, 1);

      }

       
    }
    openRegisterPage(jobId){
      this.desiredJob = this.jobs.find(x=>x.ID === jobId);
      this.dialogService.open(this.registerFirst);
    }
    openQuickApply(){
      this.dialogService.open(this.quickApply, {backdrop:'static'});
    }
    openLogin(){
      this.dialogService.open(this.loginModal);
    }
    goToLogin(){
      this.dialogService.dismissAll()
      window.scrollTo(0,0)
    }
    goToRegister(){
      this.dialogService.dismissAll();
      this.router.navigate(['/pages/register'])

    }

    
}
