import { StringHelper } from './string-helper'

export class SeoHelper {
  static getSeoFriendly(string: String): String {
    let stringSEOFriendly = string
    stringSEOFriendly = StringHelper.removeCharactersNonPrintable(stringSEOFriendly)
    stringSEOFriendly = StringHelper.replaceAll(stringSEOFriendly, ' ', '-')
    stringSEOFriendly = stringSEOFriendly.toLowerCase()

    return stringSEOFriendly
  }
}
