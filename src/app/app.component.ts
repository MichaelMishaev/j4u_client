import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(private router: Router, private translate: TranslateService) {
    }

    ngOnInit() {
        const lang = localStorage.getItem('selected_lang') || environment.defaultLang 
        localStorage.setItem('selected_lang', lang );
        this.translate.setDefaultLang(lang);
        this.translate.use(lang);
        this.subscription = this.router.events
        .pipe(
            filter(event => event instanceof NavigationEnd)
        )
        .subscribe(() => window.scrollTo(0, 0));
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }



}