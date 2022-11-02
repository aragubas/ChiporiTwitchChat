export class Emote {
  end: number = 0;
  id: string = "";
  start: number = 0;

  constructor(end: number, id: string, start: number) {
    this.end = end;
    this.start = start;
    this.id = id;
  }
}

export default class Message {
  author: string = "";
  content: string = "";
  userColor: string = "";
  emotes: Array<Emote> = [];
  timedOut: boolean = false;

  constructor(author: string, content: string, userColor: string, emotes: Array<Emote>) {
    this.author = author;
    this.content = content;
    this.userColor = userColor;
    this.emotes = emotes;
  }
}
