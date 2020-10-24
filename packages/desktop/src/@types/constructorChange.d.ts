declare interface String {
  replaceAll(search: string, replacement: string) : string;
}

declare var $: function(elem): HTMLElement | null;

declare var ColorThief: {
  getColor: function(string): Promise<number[]>;
  getPalette: function(string, number): Promise<number[][]>;
};

interface Window {
  webkitAudioContext: typeof AudioContext
}

interface Number {
  round(places?: number): number;
  clamp(lower: number, upper: number): number;
}

interface Array {
  shuffle<K>(): K[];
}
