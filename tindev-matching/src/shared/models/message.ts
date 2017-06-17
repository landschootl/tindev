import { DateUtils } from '../utils/date';
export class Message {
    date: Date;
    content: string;
    email_sender: string;
    email_receiver: string;
    sender_name: string;

    constructor(date_sent: string, content: string, sender_name, email_sender, email_receiver) {
        var dutils = new DateUtils();
        this.date = dutils.getDateFromString(date_sent);
        this.content = content;
        this.sender_name = sender_name;
        this.email_receiver = email_receiver;
        this.email_sender = email_sender;
    }
}


/*
 "project_name" : "Chef de projet Big Data",
 "interlocutor_name" : "Ali Connors",
 "last_message" : {
 "date_sent" : "18/05/2017 13:58:23",
 "content" : "Hello Mr. I'm sending you this message in order to have a meeting with you because I think your profile is exactly what we need for our project"
 },
 */
