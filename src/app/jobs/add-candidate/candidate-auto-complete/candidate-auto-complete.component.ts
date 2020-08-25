import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-candidate-auto-complete',
  templateUrl: './candidate-auto-complete.component.html',
  styleUrls: ['./candidate-auto-complete.component.scss']
})
export class CandidateAutoCompleteComponent implements OnInit {
  candidatesForJobs: any[] = [];
  candidateForJob: any;
  
  formatter1 = (result: { name: string,country:string }) => result.name;
  @Input() disabled = false;
  @Input() usersInsteadOfCandidates = false;
  @Output() onCandidateSelected = new EventEmitter();
  constructor(private apiService: ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if(this.usersInsteadOfCandidates){
      this.apiService.getUsersBase().pipe(map((data) => this.mapCandidates(data)))
      .subscribe();
    } else {
      this.apiService.getCandidates().pipe(map((data) => this.mapCandidates(data)))
      .subscribe();
    }
  }
  mapCandidates(data){
    this.candidatesForJobs = 
            data.map((i)=> {
                  return {
                    id: i.Id,
                    name: i.FullName ? i.FullName + ' - ' + i.Email : i.FirstName + ' ' + i.LastName + ' - ' + i.Email,
                    hasCv : i.HasCV === 1,
                    country: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
                  }}
                );
  }
  ngOnChanges(){
    if(this.disabled){
      this.candidateForJob = ''
    }
  }
  candidateSelected(){
    this.onCandidateSelected.emit(this.candidateForJob)
  }
  searchFlags = (text$: Observable<string>) =>

  text$.pipe(
    debounceTime(200),
    map(term => term === '' ? []
      : this.candidatesForJobs.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );
  
}
