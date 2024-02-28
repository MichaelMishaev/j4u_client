import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/shared/api/api.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NbSpinnerService } from '@nebular/theme';
import * as AOS from 'aos';
//import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  contactForm:FormGroup;
  isContactFormSent = false;
  isMobile = false;
  @ViewChild('loginModal', {static: false}) loginModal: TemplateRef<any>;
  constructor(private spinner$: NbSpinnerService,private api: ApiService,// private deviceService: DeviceDetectorService,
              private formBuilder: FormBuilder, private dialogService: NgbModal) { }

  ngOnInit() {
    //TODO: mishaev, not supported anymore FUCK!
 //   this.isMobile = this.deviceService.isMobile();

    AOS.init();
    this.spinner$.load();
    this.contactForm = this.formBuilder.group({
      CustomerName : new FormControl('',[Validators.required]),
      Email : new FormControl('',[Validators.required, Validators.email]),
      Message : new FormControl('',[Validators.required]),
      PhoneNumber : new FormControl('',[Validators.required]),
      CompanyName : new FormControl('',[]),
    })
  }
  submitContactForm(){
    if(this.contactForm.invalid){
      alert('יש להזין את כל השדות וכתובת מייל חוקית');
      return;
    }
    this.api.addContactForm(this.contactForm.value).subscribe(res=>{
      this.isContactFormSent = true;
    })
  }
  openEmployerForm(dialog){

    this.dialogService.open(dialog, { size: 'lg'});
  }
  scrollToBottom(){
    window.scrollTo(0,document.body.scrollHeight)
  }
  openLogin(){
    this.dialogService.open(this.loginModal);
  }
}
