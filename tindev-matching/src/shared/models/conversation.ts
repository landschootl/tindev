import { Message } from './message';
import { User } from './user';

export class Conversation {
  project_name: string;
  interlocutor_name: string;
  last_message : Message;
  messages : Message[];
  interlocutor : User;
 
  constructor(project_name: string, interlocutor_name: string, last_message: Message) {
    this.project_name = project_name;
    this.interlocutor_name = interlocutor_name;
    this.last_message = last_message;
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