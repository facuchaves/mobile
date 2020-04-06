import ReactGA from 'react-ga'
import { GTM_TID } from '../constants'

export function initialize() {
  ReactGA.initialize(GTM_TID, {
    // standardImplementation: true,
    testMode: process.env.NODE_ENV === 'development',
  })
}

export function pageView(path, trackerNames, title) {
  ReactGA.pageview(path, trackerNames, title)
}

export function throwEvent(args) {
  ReactGA.event(args)
}
