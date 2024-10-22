declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// While we're at it, let's add other common file types you might use
declare module '*.css' {
  const css: { [key: string]: string };
  export default css;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}
