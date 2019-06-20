import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from './../../../../services/chatroom.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef = null;

  private _subscriptions: Subscription[] = [];
  public chatroom: Observable<any> = null;
  public messages: Observable<any> = null;

  constructor(
    private _route: ActivatedRoute,
    private _loadingService: LoadingService,
    private _chatroomService: ChatroomService
  ) {
    this._loadingService.isLoading.next(true);

    this._subscriptions.push(
      this._chatroomService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
      })
    )
    
    this._subscriptions.push(
      this._chatroomService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
      })
    )
  }

  ngOnInit() {
    this._scrollToBottom();
    this._subscriptions.push(
      this._route.paramMap.subscribe(params => {
        const chatroomId = params.get('chatroomId');
        this._chatroomService.changeChatroom.next(chatroomId);
        setTimeout(() => {
          this._loadingService.isLoading.next(false)
        }, 0);
      })
    )
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }

  ngAfterViewChecked() {
    this._scrollToBottom();
  }

  private _scrollToBottom(): void {
    try{
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) {

    }
  }

}
