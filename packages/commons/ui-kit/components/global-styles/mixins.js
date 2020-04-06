export const makeGlobalStyles = props => {
  return `@import url('${props.theme.fonts.inports.primary}');
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: ${props.theme.colors['html-bg']};
  }

  article, aside, figcaption, figure, footer, header, hgroup, main, nav, section {
    display: block;
  }

  body {
    margin: 0;
    font-family: ${props.theme.fonts.families.primary};
    font-size: ${props.theme.fonts.sizes.normal};
    font-weight: 400;
    line-height: 1.5;
    color: ${props.theme.colors['text-color']};
    text-align: left;

    background-color: ${props.theme.colors['body-bg']};
  }

  [tabindex="-1"]:focus {
    outline: 0 !important;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0;
    line-hight: normal;
    font-weight: normal;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  abbr[title],
  abbr[data-original-title] {
    text-decoration: underline;
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
    cursor: help;
    border-bottom: 0;
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
  }

  address {
    margin-bottom: 1rem;
    font-style: normal;
    line-height: inherit;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-bottom: .5rem;
    margin-left: 0;
  }

  blockquote {
    margin: 0 0 1rem;
  }

  b,
  strong {
    font-weight: bolder;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sub {
    bottom: -.25em;
  }

  sup {
    top: -.5em;
  }

  a {
    color: ${props.theme.colors.link.normal};
    text-decoration: none;
    background-color: transparent;
    transition: color .3s ease-in-out;
    
    &:hover {
      color: ${props.theme.colors.link.darken};
      text-decoration: underline;
    }
    
    &:not([href]):not([tabindex]) {
      color: inherit;
      text-decoration: none;
      
      &:hover, 
      &:focus {
        color: inherit;
        text-decoration: none;
      }
      
      &:focus {
        outline: 0;
      }
    }
  }

  pre,
  code,
  kbd,
  samp {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 1em;
  }

  pre {
    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;
  }

  figure {
    margin: 0 0 1rem;
  }

  img {
    vertical-align: middle;
    border-style: none;
  }

  svg {
    overflow: hidden;
    vertical-align: middle;
  }

  caption {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    color: #6c757d;
    text-align: left;
    caption-side: bottom;
  }

  legend {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin-bottom: .5rem;
    font-size: 1.5rem;
    line-height: inherit;
    color: inherit;
    white-space: normal;
  }

  output {
    display: inline-block;
  }

  summary {
    display: list-item;
    cursor: pointer;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none !important;
  }
  
  .text-right {
    text-align: right;
  }
  
  [type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
    cursor: pointer;
  }`
}
