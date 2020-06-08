import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {

    constructor(private router: Router, private translate: TranslateService, private service: NbAuthService,
                private route: ActivatedRoute, private toaster: ToastrService) { }
    userEmail: string;
    redirectDelay = 5000;
  
    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    // On submit click, reset form fields
    onSubmit() {
        this.errors = this.messages = [];
        this.submitted = true;
    
        this.service.requestPassword('email', this.userEmail).subscribe((result: NbAuthResult) => {
          this.submitted = false;
          if (result.isSuccess()) {
            this.messages = result.getMessages();
          } else {
            this.errors = result.getErrors();
          }
          this.toaster.success(this.translate.instant("We will contact you shortly for a password reset. You will now be redirected to login"))
          setTimeout(() => {
            return this.router.navigateByUrl("/");
          },this.redirectDelay)
          
        });
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
