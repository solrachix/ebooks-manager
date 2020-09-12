globalThis.$ = (elem: string): HTMLElement | null => window.document.querySelector<HTMLElement>(elem)
