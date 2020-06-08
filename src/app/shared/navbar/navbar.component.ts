import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { NbAuthService, NbAuthResult, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  userType:any;
  public isCollapsed = true;
  layoutSub: Subscription;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};

  constructor(public translate: TranslateService, private auth: NbAuthService, public userService: UserService,
     private layoutService: LayoutService,private searchService: NbSearchService,  private configService:ConfigService, private router: Router) {


    this.layoutSub = layoutService.changeEmitted$.subscribe(
      direction => {
        const dir = direction.direction;
        if (dir === "rtl") {
          this.placement = "bottom-left";
        } else if (dir === "ltr") {
          this.placement = "bottom-right";
        }
      });
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
    this.auth.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.userService.setCurrentUser(token.getPayload());
      }

    });
    const u = this.userService.getCurrentUser()
    this.userType = u && u.userType
  }

  ngAfterViewInit() {
    if(this.config.layout.dir) {
      setTimeout(() => {
        const dir = this.config.layout.dir;
        if (dir === "rtl") {
          this.placement = "bottom-left";
        } else if (dir === "ltr") {
          this.placement = "bottom-right";
        }
      }, 0);
     
    }
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  ChangeLanguage(language: string) {
    const prevLang = localStorage.getItem('selected_lang' );
    localStorage.setItem('selected_lang',language)
    if(language === 'he' || prevLang === 'he' ){
      window.location.reload()
    } else {
      this.translate.use(language);
    }
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitNotiSidebarChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }
  logout(strategy){
    this.auth.logout(strategy).subscribe((result: NbAuthResult) => {

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, 10);
      }
    });
  }
    
  clickSearchContainer(term){
    this.searchService.submitSearch(term.target.value);
  }
}
