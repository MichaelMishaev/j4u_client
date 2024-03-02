import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'app/shared/api/api.service';
import { UserService } from 'app/shared/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-learn-room',
  templateUrl: './learn-room.component.html',
  styleUrls: ['./learn-room.component.scss']
})
export class LearnRoomComponent implements OnInit {

   videoUrl: string = "https://www.youtube.com/embed/Quqsxc8zl1o"; 
  safeUrl: SafeResourceUrl;

  constructor(private api: ApiService, private userService: UserService,
    private toastr: ToastrService, private translate: TranslateService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

}
