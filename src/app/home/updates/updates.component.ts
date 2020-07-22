import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {
  updates: any[]
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getjobCandidateHistoryByUser().subscribe((res: any)=>{
      this.updates = res
    });
  }

}
