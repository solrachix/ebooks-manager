declare interface String {
  replaceAll(search: string, replacement: string) : string;
}

declare var $: function(elem: string): HTMLElement | null;
