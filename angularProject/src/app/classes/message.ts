import { User } from './../interfaces/user';

export class Message {
    message: string;
    createdAt: any;
    sender: User;

    constructor({message, createAt, sender}){
        this.message = message;
        this.createdAt = createAt;
        this.sender = sender;
    }
}
