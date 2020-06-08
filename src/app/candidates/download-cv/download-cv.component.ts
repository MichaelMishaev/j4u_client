import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from "file-saver";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'download-cv',
  templateUrl: './download-cv.component.html',
  styleUrls: ['./download-cv.component.scss']
})
export class DownloadCvComponent implements OnInit {

  @Input() fileExtension:string;
  @Input() id:any;
  @Output() cvDownloaded = new EventEmitter();
  rowData: any;
 

  constructor(private api: ApiService, private translate: TranslateService, private toastrService: ToastrService){

  }
  ngOnInit(): void {
    this.id = this.id || this.rowData.OriginalCandidateId || this.rowData.Id;
  }
  downloadCv(e){
    e.preventDefault()
    this.api.downloadCv(this.id).subscribe(data => {
      saveAs(data,`${this.id}.${this.fileExtension || this.rowData.FileExtension}`);
      this.cvDownloaded.emit(true);
    },
    err => {
      this.toastrService.error(this.translate.instant('Error downloading the file'))
      console.error(err);
    }
 );
  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'text/docx' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }


}
