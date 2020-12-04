declare interface String {
  replaceAll(search: string, replacement: string) : string;
}

declare interface Number {
  rankNumber() : string;
}

declare module 'pdf-poppler'
