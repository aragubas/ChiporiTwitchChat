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

function random(length: number = 8): string {
  // Declare all characters
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  // Pick characers randomly
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
}

export default class Message {
  author: string = "";
  content: string = "";
  userColor: string = "";
  emotes: Array<Emote> = [];
  timedOut: boolean = false;
  id: string = random(20);

  constructor(author: string, content: string, userColor: string, emotes: Array<Emote>) {
    this.author = author;
    this.content = content;
    this.userColor = userColor;
    this.emotes = emotes;
  }
}
