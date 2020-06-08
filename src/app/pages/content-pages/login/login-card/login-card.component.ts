import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent {

  redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';
  
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    //socialLinks: NbAuthSocialLink[] = [];
    rememberMe = false;
    
    constructor(@Inject(NB_AUTH_OPTIONS) protected options = {},
                public dialogService: NgbModal,
                protected service: NbAuthService,
                private route: ActivatedRoute,
                private translate: TranslateService,
                protected cd: ChangeDetectorRef,
                protected router: Router) {
  
      this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
      this.showMessages = this.getConfigValue('forms.login.showMessages');
      this.strategy = this.getConfigValue('forms.login.strategy');
    //   this.socialLinks = this.getConfigValue('forms.login.socialLinks');
      this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  
    }
  
    login(provider = 'email'): void {
      this.errors = [];
      this.messages = [];
      this.submitted = true;
  
      this.service.authenticate(provider || this.strategy, this.user).subscribe((result: any) => {
        this.submitted = false;
  
        if (result.isSuccess()) {
          this.messages = result.getMessages();
        } else {
  
          //var err = result.response.error.message;
          // if(err && err === 'User is not active'){
          //   this.errors = [" 0547323593 או בווטסאפ info@j4u.work המשתמש טרם אושר. נא צור קשר במייל "];
          // }else{
          //   this.errors = ["Invalid credentials, please try again"];
          // }
          this.errors = [this.translate.instant("Invalid credentials, please try again")];
          return;
        }
        const redirect = '/jobs';
        if (redirect) {
          setTimeout(() => {
            
            return this.router.navigateByUrl(redirect).then(n=>{
              this.dialogService.dismissAll()
            });
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      });
    }
  
    getConfigValue(key: string): any {
      return getDeepFromObject(this.options, key, null);
    }
    // On Forgot password link click
    onForgotPassword() {
      this.dialogService.dismissAll();

        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    goToRegister(){
      this.dialogService.dismissAll();
      this.router.navigate(['/pages/register'])

    }
}
