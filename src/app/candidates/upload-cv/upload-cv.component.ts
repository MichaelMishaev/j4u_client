import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.scss'],
})
export class UploadCvComponent implements OnInit{
  @Output() updateResult = new EventEmitter<any>();
  @Input() id:number;

  loading = false;
  uploaded = false;
  uploadedFiles: any;
  rowData: any;


  constructor(private api: ApiService,public dialogService: NgbModal,
     private toastrService: ToastrService,private ref: ChangeDetectorRef){

  }
  ngOnInit(): void {
    this.id = this.id || this.rowData.OriginalCandidateId || this.rowData.Id;
  }
  fileChange(element) {
    debugger;
    this.uploadedFiles = element.target.files;
    this.upload();
  }
  upload() {
    if(!this.uploadedFiles || this.uploadedFiles.length === 0 ){return}
    let formData = new FormData();
    let file = this.uploadedFiles[0];
    const fileExt = file.name.split('.').pop()
    formData.append("uploads", file,this.id.toString() );
    
    this.loading = true;
debugger;
    this.api.uploadCV(formData)
    .subscribe((response) => {
      debugger;
         this.toastrService.success('Uploaded successfully');
         this.loading = false;
         this.uploaded = true;
         this.ref.detectChanges()
         if(this.rowData !== 'undefined') // fast hack - if no rowData it means we are in quick apply
         {
          this.rowData.HasCV = 1;
          this.rowData.FileExtension = fileExt

          this.api.updateCandidate(this.rowData).subscribe(res=>{
           this.updateResult.emit({});
           this.dialogService.dismissAll()
          });
         } else{
          this.updateResult.emit(fileExt);
         }
    }, err =>{
      this.toastrService.error('An error occured')
      this.loading = false;
      this.ref.detectChanges()
    })
  }
}
