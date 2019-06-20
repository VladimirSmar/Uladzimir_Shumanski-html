import { Component, OnInit } from '@angular/core';
import { ChatroomService } from './../../../../services/chatroom.service';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {

  private _chatroomTitle: string = null;

  constructor(
    public chatroomService: ChatroomService,
  ) { }

  ngOnInit() {
  }

  addChatroom(): void {
    this._chatroomTitle = prompt("Enter chatroom title: ", "New Chatroom");
      this.chatroomService.addChatroom(this._chatroomTitle);
  }

}
