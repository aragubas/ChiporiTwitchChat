export default class Message {
  author: string = "";
  content: string = "";
  userColor: string = "";
  timedOut: boolean = false;

  constructor(author: string, content: string, userColor: string) {
    this.author = author;
    this.content = content;
    this.userColor = userColor;
  }
}
