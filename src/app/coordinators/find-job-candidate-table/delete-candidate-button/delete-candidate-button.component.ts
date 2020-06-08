import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'delete-candidate-button',
  templateUrl: './delete-candidate-button.component.html',
  styleUrls: ['./delete-candidate-button.component.scss']
})
export class DeleteCandidateButtonComponent implements OnInit {
  @Output() updateResult = new EventEmitter<any>();

  id:number;
  uploadedFiles: any;
  public rowData: any;


  constructor(private dialogService: NgbModal,private api: ApiService){

  }
  ngOnInit(): void {
  }
  openModal(dialog){
    const dialogRef = this.dialogService.open(dialog);
    dialogRef.componentInstance.data = this.rowData
  }
  updateCandidate(){
    var obj = {isFromPool : 0, candidateId : this.rowData.CandidateId}
    this.api.updateCandidateIsFromPool(obj).subscribe(() => {
      this.updateResult.emit({});

    })
  }
}
