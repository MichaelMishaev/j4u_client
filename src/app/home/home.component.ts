import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
import { UserService } from 'app/shared/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentPage = 'home'
  homeMessages = []
  constructor(private route: ActivatedRoute, private router:Router, private apiService: ApiService, private userService: UserService) { }
  currentUser = {}
  jobCandidateByUser = []
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params['p']){
          this.currentPage = params['p'];    
      }
    });
    this.apiService.getJobCandidateByUser(this.userService.getCurrentUser().id).subscribe((res:any[]) =>{
      this.jobCandidateByUser = res;
    });
    this.apiService.getGeneralMessages().subscribe((res: []) => {
      this.homeMessages = res;
    })
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

}
