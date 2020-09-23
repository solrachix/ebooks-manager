declare interface String {
  replaceAll(search: string, replacement: string) : string;
}

declare var $: function(elem): HTMLElement | null;

interface Window {
  webkitAudioContext: typeof AudioContext
}
