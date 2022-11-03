export function randomString(length: number = 8): string {
  // Declare all characters
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  // Pick characers randomly
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
}

export function randomStringLowercase(length: number = 8): string {
  // Declare all characters
  let chars = "abcdefghijklmnopqrstuvwxyz";

  // Pick characers randomly
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
}

export function replaceChar(origString: string, replaceChar: string, index: number): string {
  let firstPart = origString.substring(0, index);
  let lastPart = origString.substring(index + 1);

  let newString = firstPart + replaceChar + lastPart;
  return newString;
}

export function isAlphaNumeric(str: string): boolean {
  return str.match(/^[a-z0-9]+$/i) !== null;
}
