import { Component , OnInit} from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-candidate-remarks',
  templateUrl: './candidate-remarks.component.html',
  styleUrls: ['./candidate-remarks.component.scss']
})
export class CandidateRemarksComponent implements OnInit{

  id:number;
  uploadedFiles: any;
  public rowData: any;


  constructor(private dialogService: NgbModal,private api: ApiService, 
    private toastr: ToastrService, private translate: TranslateService){

  }
  ngOnInit(): void {

  }
  openModal(dialog){
    this.dialogService.open(dialog, {
    });
  }
  closeModal(){
    this.dialogService.dismissAll()
  }
  updateCandidate(){
    this.api.updateCandidate(this.rowData).subscribe(() => {
      this.toastr.success(this.translate.instant('Saved successfully'))
      this.dialogService.dismissAll()
    })
  }

}
