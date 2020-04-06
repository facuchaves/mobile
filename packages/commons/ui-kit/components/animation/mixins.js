import { css, keyframes } from 'styled-components'

const kfFadeInSlideDownIn = keyframes`0% {
    opacity: 0;
    transform: translate3d(0,-100%,0);
}
100% {
    opacity: 1;
    transform: none;
}`

const kfFadeInSlideDownOut = keyframes`0% {
    opacity: 1;
}
100% {
    opacity: 0;
    transform: translate3d(0,-100%,0);
}`

export const fadeInSlideDown = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entering {
      transform: none;
      display: none;
    }

    &.animation-entered {
      animation-name: ${kfFadeInSlideDownIn};
    }

    &.animation-exiting {
      animation-name: ${kfFadeInSlideDownOut};
    }

    &.animation-exited {
      display: none;
    }
  `
}

const kfFadeInSlideUpIn = keyframes`0% {
    opacity: 0;
    transform: translate3d(0,100%,0);
}

100% {
    opacity: 1;
    transform: none;
}`

const kfFadeInSlideUpOut = keyframes`0% {
    opacity: 1;
}

100% {
    opacity: 0;
    transform: translate3d(0,100%,0);
}`

export const fadeInSlideUp = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entering {
      transform: none;
      display: none;
    }

    &.animation-entered {
      animation-name: ${kfFadeInSlideUpIn};
    }

    &.animation-exiting {
      animation-name: ${kfFadeInSlideUpOut};
    }

    &.animation-exited {
      display: none;
    }
  `
}

const kfFadeInSlideLeftIn = keyframes`0% {
    opacity: 0;
    transform: translate3d(-100%,0,0);
}
100% {
    opacity: 1;
    transform: none;
}`

const kfFadeInSlideLeftOut = keyframes`0% {
    opacity: 1;
}

100% {
    opacity: 0;
    transform: translate3d(-100%,0,0);
}`

export const fadeInSlideLeft = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entering {
      transform: none;
      display: none;
    }

    &.animation-entered {
      animation-name: ${kfFadeInSlideLeftIn};
    }

    &.animation-exiting {
      animation-name: ${kfFadeInSlideLeftOut};
    }

    &.animation-exited {
      display: none;
    }
  `
}

const kfFadeInSlideRightIn = keyframes`0% {
    opacity: 0;
    transform: translate3d(100%,0,0);
}
100% {
    opacity: 1;
    transform: none;
}`

const kfFadeInSlideRightOut = keyframes`0% {
    opacity: 1;
}

100% {
    opacity: 0;
    transform: translate3d(100%,0,0);
}`

export const fadeInSlideRight = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entering {
      transform: none;
      display: none;
    }

    &.animation-entered {
      animation-name: ${kfFadeInSlideRightIn};
    }

    &.animation-exiting {
      animation-name: ${kfFadeInSlideRightOut};
    }

    &.animation-exited {
      display: none;
    }
  `
}

const kfFadeIn = keyframes`0% {
    opacity: 0;
}
100% {
    opacity: 1;
}`

const kfFadeOut = keyframes`0% {
    opacity: 1;
}
100% {
    opacity: 0;
}`

export const fadeIn = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entering {
      transform: none;
      display: none;
    }

    &.animation-entered {
      animation-name: ${kfFadeIn};
    }

    &.animation-exiting {
      animation-name: ${kfFadeOut};
    }

    &.animation-exited {
      display: none;
    }
  `
}

const kfBounceIn = keyframes`0%, 20%, 40%, 60%, 80%, 100% {
    animation-timing-function: cubic-bezier(.215,.61,.355,1);
  }
  0% {
      opacity: 0;
      transform: scale3d(.3,.3,.3);
  }
  20% {
      transform: scale3d(1.1,1.1,1.1);
  }
  40% {
      transform: scale3d(.9,.9,.9);
  }
  60% {
      opacity: 1;
      transform: scale3d(1.03,1.03,1.03);
  }
  80% {
      transform: scale3d(.97,.97,.97);
  }
  100% {
      opacity: 1;
      transform: scaleX(1);
  }`

const kfBounceOut = keyframes`20% {
      transform: scale3d(.9,.9,.9);
  }
  50%, 55% {
      opacity: 1;
      transform: scale3d(1.1,1.1,1.1);
  }
  100% {
      opacity: 0;
      transform: scale3d(.3,.3,.3);
  }`

export const bounceIn = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entered {
      animation-name: ${kfBounceIn};
    }

    &.animation-entering {
      display: none;
    }

    &.animation-exited {
      animation-name: ${kfBounceOut};
    }
  `
}

const kfBounceInDown = keyframes`0%, 60%, 75%, 90%, 100% {
    animation-timing-function: cubic-bezier(.215,.61,.355,1);
    transition: all .3s ease-in-out;
  }
  0% {
    opacity: 0;
    transform: translate3d(0,-3000px,0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0,25px,0);
  }
  75% {
    transform: translate3d(0,-10px,0);
  }
  90% {
    transform: translate3d(0,5px,0);
  }
  100% {
    transform: none;
  }`

const kfBounceOutDown = keyframes`20% {
    -webkit-transform: translate3d(0,10px,0);
    transform: translate3d(0,10px,0);
  }
  40%, 45% {
    opacity: 1;
    -webkit-transform: translate3d(0,-20px,0);
    transform: translate3d(0,-20px,0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translate3d(0,2000px,0);
    transform: translate3d(0,2000px,0);
  }`

export const bounceInDown = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entered {
      animation-name: ${kfBounceInDown};
    }

    &.animation-entering {
      display: none;
    }

    &.animation-exited {
      animation-name: ${kfBounceOutDown};
    }
  `
}

const kfBounceInLeft = keyframes`0%, 60%, 75%, 90%, 100% {
      animation-timing-function: cubic-bezier(.215,.61,.355,1);
  }

  0% {
      opacity: 0;
      transform: translate3d(-3000px,0,0);
  }
  60% {
      opacity: 1;
      transform: translate3d(25px,0,0);
  }
  75% {
      transform: translate3d(-10px,0,0);
  }
  90% {
      transform: translate3d(5px,0,0);
  }
  100% {
      transform: none;
  }`

const kfBounceOutLeft = keyframes`20% {
    opacity: 1;
    transform: translate3d(20px,0,0);
}
100% {
    opacity: 0;
    transform: translate3d(-2000px,0,0);
}`

export const bounceInLeft = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entered {
      animation-name: ${kfBounceInLeft};
    }

    &.animation-entering {
      display: none;
    }

    &.animation-exited {
      animation-name: ${kfBounceOutLeft};
    }
  `
}

const kfBounceInRight = keyframes`0%, 60%, 75%, 90%, 100% {
    animation-timing-function: cubic-bezier(.215,.61,.355,1);
  }

  0% {
      opacity: 0;
      transform: translate3d(3000px,0,0);
  }
  60% {
      opacity: 1;
      transform: translate3d(-25px,0,0);
  }
  75% {
      transform: translate3d(10px,0,0);
  }
  90% {
      transform: translate3d(-5px,0,0);
  }
  100% {
      transform: none;
  }`

const kfBounceOutRight = keyframes`20% {
    opacity: 1;
    transform: translate3d(-20px,0,0);
  }

  100% {
    opacity: 0;
    transform: translate3d(2000px,0,0);
  }`

export const bounceInRight = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entered {
      animation-name: ${kfBounceInRight};
    }

    &.animation-entering {
      display: none;
    }

    &.animation-exited {
      animation-name: ${kfBounceOutRight};
    }
  `
}

const kfBounceInUp = keyframes`0%, 60%, 75%, 90%, 100% {
    animation-timing-function: cubic-bezier(.215,.61,.355,1);
}

0% {
    opacity: 0;
    transform: translate3d(0,3000px,0);
}
60% {
    opacity: 1;
    transform: translate3d(0,-20px,0);
}
75% {
    transform: translate3d(0,10px,0);
}
90% {
    transform: translate3d(0,-5px,0);
}
100% {
    transform: translateZ(0);
}`

const kfBounceOutUp = keyframes`20% {
    transform: translate3d(0,-10px,0);
}

40%, 45% {
    opacity: 1;
    transform: translate3d(0,20px,0);
}
100% {
    opacity: 0;
    transform: translate3d(0,-2000px,0);
}`

export const bounceInUp = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entered {
      animation-name: ${kfBounceInUp};
    }

    &.animation-entering {
      display: none;
    }

    &.animation-exited {
      animation-name: ${kfBounceOutUp};
    }
  `
}

const kfZoomIn = keyframes`0% {
    opacity: 0;
    transform: scale3d(.3,.3,.3);
}

50% {
    opacity: 1;
}`

const kfZoomOut = keyframes`0% {
    opacity: 1;
}
50% {
    transform: scale3d(.3,.3,.3);
}
50%, 100% {
    opacity: 0;
}`

export const zoomIn = () => {
  return css`
    animation-duration: 1s;
    animation-fill-mode: both;

    &.animation-entered {
      animation-name: ${kfZoomIn};
    }

    &.animation-entering {
      display: none;
    }

    &.animation-exited {
      animation-name: ${kfZoomOut};
    }
  `
}
