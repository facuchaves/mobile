import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { sign } from 'jsonwebtoken'
import BadSignatureError from '../models/bad-signature.error'
import { ConfigService } from '../config/config.service'
const crypto = require('crypto')

/**
 * Clase que encripta y desencripta de la misma manera que en grails.
 * En esta primer etapa, hay un workarround porque usamos cookies compartidas entre grails y node, y grails encripta usando ObjectOutputStream que le agrega un prefijo de Id de objeto + largo del valor encriptado que node no hace por default.
 * Cuando se termine la migracion y solo se use node, se va a sacar el workarround.
 *
 * Para encriptar/desencriptar usamos los siguientes elementos :
 *    - Un pad de 32 que se genera a partir del IV de 16 aleatorio. (es necesario para CBC)
 *    - El valor encriptado en AES
 *    - Una firma formada por un hash SHA256
 *
 * //AES/CBC/PKCS5Padding (PKCS5)
 */
@Injectable()
export class Encrypter {
  constructor(private readonly configService: ConfigService) {}

  static PREFIX_WORKARROUND = Buffer.from([-84, -19, 0, 5, 116]) // Workarround : es un prefijo que Grails pone al usar ObjectOutputStream cuando encripta. Al hacer new ObjectOutputStream(baos) escribe los primeros 4 numeros : [-84,-19,0,5]. Luego al escribir el valor en el cuando hace outputStream.writeObject(value) le agrega [116] y 2 bytes mas que representan el largo del stream a encriptar. Esos numeros los calculamos en el metodo addPrefixToValueToEncrypt
  static PREFIX_WORKARROUND_LENGHT = 7 // Workarround : Grails cuando encripta en EncryptionUtils usa ObjectOutputStream lo cual pone un prefijo de largo 7 que identifica el tipo de objeto y su largo.
  static algorithm = 'aes-128-cbc'
  password = this.configService.get('ENCRYPT_PASSWORD')
  static algorithmHash = 'sha256'

  /**
   * Usamos un vector de inicializacion de 16 bytes (es necesario para CBC)
   */
  generateIv() {
    return crypto.randomBytes(Math.ceil(16))
  }

  /**
   * //AES/CBC/PKCS5Padding (PKCS5)
   *
   *  Para encriptar usamos los siguientes elementos :
   *    - Un pad de 32 que se genera a partir del IV de 16 aleatorio. (es necesario para CBC)
   *    - El valor encriptado en AES
   *    - Una firma formada por un hash SHA256
   *
   * @param valueToEncrypt El valor a encriptar
   * @param iv Vector de inicializacion de 16 bytes (es necesario para CBC)
   */
  encrypt(valueToEncrypt): string {
    const iv = this.generateIv()
    const cipher = crypto.createCipheriv(Encrypter.algorithm, Buffer.from(this.password), iv)

    const pad = iv.toString('hex') //TODO sacar de un archivo de configuracion

    valueToEncrypt = Buffer.from(valueToEncrypt, 'binary')
    valueToEncrypt = this.addPrefixToValueToEncrypt(valueToEncrypt) // Workarround : Agrego el prefijo que agrega grails

    let encrypted = cipher.update(valueToEncrypt)
    encrypted = Buffer.concat([encrypted, cipher.final()])

    const signature = this.sign(parseHexString(valueToEncrypt.toString('hex')))

    return pad + encrypted.toString('hex') + signature
  }

  /**
   * Desencripto y checkeo que este bien firmado y que no este modificado el valor.
   *
   * Para desencriptar usamos los siguientes elementos :
   *    - Un pad de 32 que se genera a partir del IV de 16 aleatorio. (es necesario para CBC)
   *    - El valor encriptado en AES
   *    - Una firma formada por un hash SHA256
   *
   * @param encrypted Valor encriptado
   */
  decrypt(encrypted: string): string {
    const iv = Buffer.from(encrypted.substring(0, 32), 'hex')
    const encryptedValue = encrypted.substring(32, encrypted.length - 64)
    const signature = encrypted.substring(encrypted.length - 64)
    const decipher = crypto.createDecipheriv(Encrypter.algorithm, this.password, iv)

    let decryptedValue = decipher.update(parseHexString(encryptedValue), 'hex', 'binary')
    decryptedValue += decipher.final('binary')
    try {
      this.verifySignature(signature, decryptedValue) //TODO Revisar bien el segundo parametro
    } catch (error) {
      if (error instanceof BadSignatureError) {
        throw new BadSignatureError(
          `Error al verificar firma luego de desencriptar.
      Encriptado : ${encrypted}
      Desencriptado: ${decryptedValue}
      Firma esperada: ${this.sign(decryptedValue)}
      Firma obtenida: ${signature}
      `
        )
      }
    }

    return this.transformDecryptedData(decryptedValue) // Workarround : Saco el prefijo que agrega grails.
  }

  /**
   *  Workarround : Los primeros 7 caracteres los usa grails para identificar de que type es el objeto grails. En node los sacamos porque no se usan
   *
   * @param decryptedValue
   */
  transformDecryptedData(decryptedValue: string): string {
    return decryptedValue.substr(Encrypter.PREFIX_WORKARROUND_LENGHT)
  }

  /**
   *  Workarround : es un prefijo que Grails pone al usar ObjectOutputStream cuando encripta. Al hacer new ObjectOutputStream(baos) escribe los primeros 4 numeros : [-84,-19,0,5]. Luego al escribir el valor en el cuando hace outputStream.writeObject(value) le agrega [116] y 2 bytes mas que representan el largo del stream a encriptar.
   * El largo se calcula de la siguiente manera:
   *  - El primer byte representa la cantidad de bloques de largo 256
   *  - El segundo byte es la cantidad de bytes dentro del ultimo bloque de 256
   * @param valueToEncrypt
   */
  addPrefixToValueToEncrypt(valueToEncrypt): Buffer {
    const largo = valueToEncrypt.length
    const cantidadDeBloques256 = Math.floor(largo / 256) // Cantidad de bloques de largo 256
    const remanenteDentroDelBloque = largo % 256 // La cantidad de bytes dentro del ultimo bloque de 256

    return Buffer.concat([
      Encrypter.PREFIX_WORKARROUND,
      Buffer.from([cantidadDeBloques256, remanenteDentroDelBloque]),
      Buffer.from(valueToEncrypt),
    ])
  }

  /**
   *
   * Firmamos el valor encriptado usando el hash SHA256
   *
   * @param valueToSign
   */
  sign(valueToSign): string {
    const bytes = Buffer.from(valueToSign, 'binary')
    return crypto
      .createHash(Encrypter.algorithmHash)
      .update(bytes)
      .digest('hex')
  }

  /**
   * Checkeamos que el valor encriptado este bien firmado.
   * Si la firma que enviaron y la firma que deberia ser son distintas, es porque el dato se manipulo intencionalmente.
   *
   * @param signature
   * @param valueToSign
   */
  verifySignature(signature: string, valueToSign) {
    if (signature !== this.sign(valueToSign)) {
      throw new BadSignatureError('')
    }
  }
}

function parseHexString(theString) {
  theString = theString.split('')
  const len = theString.length

  // "111" is not a valid hex encoding.
  if (len % 2 != 0) {
    console.log('hexBinary needs to be even-length: ' + theString)
    return
  }

  const out = new Int8Array(len / 2)
  for (let i = 0; i < len; i += 2) {
    const h = hexToBin(theString[i])
    const l = hexToBin(theString[i + 1])
    if (h == -1 || l == -1) {
      console.log('contains illegal character for hexBinary: ' + theString)
      return
    }
    out[i / 2] = h * 16 + l
  }

  return out
}

function hexToBin(ch) {
  ch = ch.charCodeAt(0)
  const zero = '0'.charCodeAt(0)
  const nine = '9'.charCodeAt(0)
  const capA = 'A'.charCodeAt(0)
  const capF = 'F'.charCodeAt(0)
  const smalla = 'a'.charCodeAt(0)
  const smallf = 'f'.charCodeAt(0)
  if (zero <= ch && ch <= nine) {
    return ch - zero
  }
  if (capA <= ch && ch <= capF) {
    return ch - capA + 10
  }
  if (smalla <= ch && ch <= smallf) {
    return ch - smalla + 10
  }
  return -1
}
