import { Component, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getDeepFromObject, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {
    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';
  
    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    // socialLinks: NbAuthSocialLink[] = [];
  
    constructor(protected service: NbAuthService,
                private translate: TranslateService,
                @Inject(NB_AUTH_OPTIONS) protected options = {},
                protected router: Router) {
  
      this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
      this.showMessages = this.getConfigValue('forms.register.showMessages');
      this.strategy = this.getConfigValue('forms.register.strategy');
    //   this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    }
  
    register(): void {
      this.errors = this.messages = [];
      this.submitted = true;
  
      this.service.register(this.strategy, this.user).subscribe((result: any) => {
        this.service.authenticate('email', this.user).subscribe((result: any) => {
  
          this.submitted = false;
          if (result.isSuccess()) {
            this.messages = [this.translate.instant("You registred successfully, and will now be redirected to the site")];
          } else {
            var err = result.response.error.msg;
            if(err && err === "Duplicate email"){
              this.errors = [this.translate.instant("Your email allready exist, please login.")];
            } else{
              this.errors = [this.translate.instant("An error occured. please try later")];
            }
          }
  
          const redirect = '/jobs'
          if (redirect) {
  
            setTimeout(() => {
              return this.router.navigate([redirect]);
            }, this.redirectDelay);
          }
        });
  
      });
    }
    goToLogin(){
      window.localStorage.setItem("openLogin", "true")
      this.router.navigate(['/pages/login'])
    }
    getConfigValue(key: string): any {
      return getDeepFromObject(this.options, key, null);
    }
}
