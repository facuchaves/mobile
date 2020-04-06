export class StringHelper {
  static removeDiacritics(self: String): String {
    self = self.trim().toLowerCase()
    self = this.replaceAll(self, ',', '')
    self = this.replaceAll(self, ' ', '-')
    self = this.replaceAll(self, '\\(', '')
    self = this.replaceAll(self, '\\)', '')
    self = this.replaceAll(self, '/', '-')
    self = this.replaceAll(self, '\\+', '')
    self = this.replaceAll(self, '#', '')
    self = this.replaceAll(self, '¿', '')
    self = this.replaceAll(self, '\\?', '')
    self = this.replaceAll(self, "'", '')
    self = this.replaceAll(self, '%', '')
    self = this.replaceAll(self, '|', '')
    self = this.replaceAll(self, '¡', '')
    self = this.replaceAll(self, '!', '')
    self = this.replaceAll(self, '"', '')
    self = this.replaceAll(self, '<', '')
    self = this.replaceAll(self, '>', '')
    self = this.replaceAll(self, '`', '')

    self = this.replaceAll(self, '-+', '-')
    self = self.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    self = this.replaceAll(self, 'p{InCombiningDiacriticalMarks}+', '')
    self = this.replaceAll(self, '\\P{Print}', '') //remove non-printable characters
    return self
  }

  static removeDiacriticsConEnie(self: String, esUrl: Boolean = false): String {
    self = self.trim().toLowerCase()
    self = this.replaceAll(self, ',', '')
    self = this.replaceAll(self, '%c3%b1', 'ñ')
    self = this.replaceAll(self, '%c3%91', 'ñ')
    self = this.replaceAll(self, '%c3%a1', 'a') // á
    self = this.replaceAll(self, '%c3%81', 'A') // Á
    self = this.replaceAll(self, '%c3%a9', 'e') // é
    self = this.replaceAll(self, '%c3%89', 'E') // É
    self = this.replaceAll(self, '%c3%ad', 'i') // í
    self = this.replaceAll(self, '%c3%8d', 'I') // Í
    self = this.replaceAll(self, '%c3%93', 'O') // Ó
    self = this.replaceAll(self, '%c3%b3', 'o') // ó
    self = this.replaceAll(self, '%c3%ba', 'u') // ú
    self = this.replaceAll(self, '%c3%9a', 'U') // Ú
    self = this.replaceAll(self, '%20', '-')
    self = this.replaceAll(self, ' ', '-')
    self = this.replaceAll(self, '(', '')
    self = this.replaceAll(self, ')', '')
    self = this.replaceAll(self, '+', '')
    self = this.replaceAll(self, '#', '')
    self = this.replaceAll(self, '¿', '')
    self = this.replaceAll(self, '?', '')
    self = this.replaceAll(self, "'", '')
    self = this.replaceAll(self, '%', '')
    self = this.replaceAll(self, '|', '')
    self = this.replaceAll(self, '¡', '')
    self = this.replaceAll(self, '!', '')
    self = this.replaceAll(self, '"', '')
    self = this.replaceAll(self, '<', '')
    self = this.replaceAll(self, '>', '')
    self = this.replaceAll(self, '`', '')
    self = this.replaceAll(self, '[', '')
    self = this.replaceAll(self, ']', '')
    self = this.replaceAll(self, '{', '')
    self = this.replaceAll(self, '}', '')

    self = this.replaceAll(self, '-+', '-')

    if (!esUrl) self = self.replace('/', '-')

    self = self.replace('ñ', '\\001')
    self = self.normalize('NFD')
    self = this.replaceAll(self, '[\\p{InCombiningDiacriticalMarks}]', '')
    self = self.replace('\\001', 'ñ')

    return self
  }

  static compareWithoutDiacritics(a: String, b: String): boolean {
    const a_ = this.removeDiacritics(a)
    const b_ = this.removeDiacritics(b)
    return a_ != null ? (a_ == b_ ? true : false) : false
  }

  static removeCharactersNonPrintable(texto: String): String {
    texto = this.removeDiacritics(texto)
    texto = this.replaceAll(texto, '\\+', '\\-')
    texto = this.replaceAll(texto, '(-+)', '-')
    return texto
  }

  static capitalizeFirstCharacter(a: String): String {
    let cadena
    if (a) cadena = a.substring(0, 1).toUpperCase() + a.substring(1).toLowerCase()

    return cadena
  }

  static replaceAll(target: String, search: string, replacement: string): String {
    return target.replace(new RegExp(search, 'g'), replacement)
  }
}
