export {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'new-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
