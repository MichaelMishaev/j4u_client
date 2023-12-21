import { Component, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './chat.model';
import { UserService } from 'app/shared/user/user.service';
import { ApiService } from 'app/shared/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

  chat: Chat[];
  activeChatUser: string;
  activeChatUserImg: string;
  @ViewChild('messageInput', {static: false}) messageInputRef: ElementRef;
  @ViewChild('chatSidebar', {static: false}) sidebar:ElementRef;
  @ViewChild('contentOverlay', {static: false}) overlay:ElementRef;

  messages = new Array();
  item: number = 0;
  public user: any;
  public allMessages: any[];
  public userCandidateHistoryMessages: any[];
  public currentMessages: any[];
  public userManagers : any[];
  public currentMessage: any;
  public onlineUsersArr: any[] = [];
  public ToUserId;
  public coordinatorsJobCount = 0;
  public coordinatorsJobCandidatesCount = 0;
  public coordinatorsUnreadJobCandidatesCount = 0;
  constructor(private elRef: ElementRef, private renderer: Renderer2, private toastrService: ToastrService,
              private userService: UserService, private apiService: ApiService) {

  }

  get filterMessages() {
    if(this.allMessages && this.allMessages.length > 0){
      return this.allMessages.filter(x=>
        (x.FromUser === this.user.id && x.ToUser === this.ToUserId)
        ||
        (x.ToUser === this.user.id && x.FromUser === this.ToUserId));
    }

  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
 

    this.initMessages();
  }
  
  initMessages(){
    debugger;
    this.apiService.getUserMessages().subscribe((res: any)=>{
      this.allMessages = res;
      this.currentMessages = this.allMessages.filter(x=>x.FromUser === this.user.id || x.ToUser === this.user.id);
    });
 
    this.apiService.getMessages().subscribe((message: string) => {
          this.allMessages.push(JSON.parse(message));
        });
    this.apiService.connectUser().subscribe(onlineUsersArr =>{
      this.onlineUsersArr = onlineUsersArr;
    });
    this.apiService.disconnectUser().subscribe(onlineUsersArr =>{
      this.onlineUsersArr = onlineUsersArr;
    });
  }
  addMessage(){
    this.apiService.AddUserMessage({Message:this.currentMessage,ToUser:this.ToUserId,FromUser:this.user.id}).subscribe(res=>{
      this.currentMessage = '';
    });
  }

  changeChatUser(toUserId){
    this.ToUserId = toUserId;
  }
  //send button function calls
  onAddMessage() {
    debugger;
    if (this.messageInputRef.nativeElement.value != "") {
      this.messages.push(this.messageInputRef.nativeElement.value);
    }
    this.messageInputRef.nativeElement.value = "";
    this.messageInputRef.nativeElement.focus();
  }

  //chat user list click event function
  SetActive(event, chatId: string) {
    var hElement: HTMLElement = this.elRef.nativeElement;
    //now you can simply get your elements with their class name
    var allAnchors = hElement.getElementsByClassName('list-group-item');
    //do something with selected elements
    [].forEach.call(allAnchors, function (item: HTMLElement) {
      item.setAttribute('class', 'list-group-item no-border');
    });
    //set active class for selected item
    event.currentTarget.setAttribute('class', 'list-group-item bg-blue-grey bg-lighten-5 border-right-primary border-right-2');
  }

  onSidebarToggle() {
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-none');
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-sm-none');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-block');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-sm-block');
    this.renderer.addClass(this.overlay.nativeElement, 'show');
  }

  onContentOverlay() {
    this.renderer.removeClass(this.overlay.nativeElement, 'show');
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-block');
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-sm-block');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-none');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-sm-none');

  }

}
