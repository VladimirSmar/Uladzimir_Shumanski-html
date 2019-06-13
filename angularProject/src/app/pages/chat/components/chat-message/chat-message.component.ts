import { Component, OnInit, Input } from '@angular/core';
import { Message } from './../../../../classes/message';
import { AuthService } from './../../../../services/auth.service';
import { User } from './../../../../interfaces/user';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;
  public currentUser: User;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.auth.currentUserSnapshot;
  }

}
