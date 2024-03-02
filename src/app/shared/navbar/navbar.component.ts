import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { NbAuthService, NbAuthResult, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { NbSearchService } from '@nebular/theme';
import { ApiService } from '../api/api.service';

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
  notifications: any =[];
  unreadNotificationsCount: any=[];
  searchShownPages = ['/jobs']
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};

  constructor(public translate: TranslateService, private auth: NbAuthService, public userService: UserService, private apiService: ApiService,
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
    // this.apiService.getjobCandidateHistoryByUser().subscribe(res=>{
    //   if(res.length){
    //     this.notifications = this.notifications.concat(res);
    //   }
    // })
    this.apiService.getNotifications().subscribe((res:any[])=>{
      if(res.length){
        this.notifications = this.notifications.concat(res);
        this.unreadNotificationsCount = res.filter(notification => notification.IsRead === 0);
      }
    })
    // this.unreadNotificationsCount = this.notifications.filter(notification => notification.IsRead === 0).length || 0;
    //     console.warn('num if unreadd: ' + this.unreadNotificationsCount.length)
  }

  // getReadNotificationsCount(): number {
  //   return this.notificationsCount?.filter(notification => notification.isRead === 1).length || 0;
  // }

  getReadNotificationsCount(): number {
    this.unreadNotificationsCount = this.notifications.filter(notification => notification.IsRead === 0).length || 0;;
    
    return this.unreadNotificationsCount;
  }

  ngAfterViewInit() {
    debugger;
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

  readMessage(notification: any){
    this.apiService.readNotification(notification).subscribe((res:any[])=>{
     this.apiService.getNotifications().subscribe((res:any[])=>{
      console.table({res})
        this.notifications = this.notifications.concat(res);
        this.unreadNotificationsCount = res.filter(notification => notification.IsRead === 0);
      
    })
    })
    // this.getReadNotificationsCount();
    //this.getReadNotificationsCount();

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
  isSearchShown(){
    return this.searchShownPages.indexOf(this.router.url) > -1
  }
}
