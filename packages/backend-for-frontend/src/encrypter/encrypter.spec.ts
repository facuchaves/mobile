import { Encrypter } from './encrypter'
import { InternalServerErrorException } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { ConfigModule } from '../config/config.module'
import BadSignatureError from '../models/bad-signature.error'

describe('Encrypt', () => {
  let service: Encrypter

  let ivTest = Buffer.from([45, 11, -34, 57, -86, 25, 51, -90, 74, 19, 106, -91, 121, 20, -69, 28])

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [Encrypter],
    }).compile()

    service = module.get<Encrypter>(Encrypter)
  })

  it('should be defined', () => {
    const generatedIv = service.generateIv()
    expect(generatedIv).toBeDefined()
  })

  it('pad len should be 32', () => {
    const generatedIv = service.generateIv()
    expect(generatedIv.length).toBe(16)
  })

  it('should encrypt "MelisaNavarro" ok', () => {
    const strTest = 'MelisaNavarro'
    const token =
      '2d0bde39aa1933a64a136aa57914bb1c18d0604b5059a8e1a3e9a792638962fba962051fe0d77708bc80af08d8b0a0071d1bf37fc1ab11c4ada1ca321a09758b1f5674a7884c23f7819d0ec20190ff56'
    jest.spyOn(service, 'generateIv').mockImplementation(() => ivTest)
    const encrypted = service.encrypt(strTest)
    expect(encrypted).toBe(token)
  })

  it('should encrypt string too long ok', () => {
    const str570 =
      'STRING_DE_570_0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    const str570Encrypted =
      '2d0bde39aa1933a64a136aa57914bb1cd2b6689616c94d8ffd2bb2854be3864ff15083984f06cdbc291fa10504a85371b7aacf3c57c40763fa6086dee3d3699f883197f5bda066f9cfd769b7f491a7cc3e9da369f3618d608f292d07f53f013de71d5166ec43918a83c8184d8abc1738f85a6ef2d1579316793ff4ff148ba35e68c9a3478af09ca4b231963ffb699748ef473997013f7910b322dacbb262be2f4e8fb7eab324b1b860f4956071e561ee6707ef6f0675c663d33557ca3766c927bef739411fdd62d1a06856a9c44c32438341fe19e996cbb543b9d8ad45c42f529e35efbd2814c8e3644f62326d829da8d475f5e699bc95f32983ef9665d4ddef776604d2b8bf83fcfbe72c6ff8374faeeac9cb0500f196064dbbf0519ae207baef31c42e2d24f1da4985c5c9cc263d0f54e97e8fa9e95f5de0bbdd9dd0a73487e47a1b52434291a7c3b744dd55863fe134ccf12ec56cbf2aee893dbe581d1b078550a4582a159ee413ead4ce63ddeaf5f4cc2405f155a82bb53746ffdc00eab861184f624cfc3c78bb8df9975125ed57d8766ea63f9d6a292dc4892ca5d45189e12dd823d40068cf6dd285694f0f9e9cb9b2709842671b59b49f4271dad22b81983d565a5b2da3296108f0f876d48ec8f8cf843d1e9ef490a9db0f5d665a0a4f1ea0d31a15109356eb5bd165e26e2482f3d83ce3c3ac9962f1dc6435e9841dc38d0e5b6e09a7c82cf12b48a8d4493788852c25e23438f09fc188f05f604ea9f59ca0d3573e28315a0bc9f306f9c5ecba297a1ad20f66a18f1b36fed71dd00ff0cb884d3e18e0f42b81db06a9e60fc91e65d27fa172468e78c1a859fb595d7c35d01c94f2ce146ce69a796ebca533f14cddd0b1541c4cffa06d10ec91067a4450'
    jest.spyOn(service, 'generateIv').mockImplementation(() => ivTest)
    const encrypted = service.encrypt(str570)
    expect(encrypted).toBe(str570Encrypted)
  })

  it('should dencrypt "hola" ok', () => {
    const holaEncriptado =
      '99cdff7d7dca19c1670891bf6855f585475e52fb4375718dbbd19b24d7664e71dbe88c02f6afab6517bd89529eaf811ff160ed0fc8ca93c1b3c7e57833662fbf'
    const decrypted = service.decrypt(holaEncriptado)
    expect(decrypted).toBe('Hola')
  })

  it('should dencrypt long text ok', () => {
    const str570 =
      'STRING_DE_570_0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    const str570Encrypted =
      '2d0bde39aa1933a64a136aa57914bb1cd2b6689616c94d8ffd2bb2854be3864ff15083984f06cdbc291fa10504a85371b7aacf3c57c40763fa6086dee3d3699f883197f5bda066f9cfd769b7f491a7cc3e9da369f3618d608f292d07f53f013de71d5166ec43918a83c8184d8abc1738f85a6ef2d1579316793ff4ff148ba35e68c9a3478af09ca4b231963ffb699748ef473997013f7910b322dacbb262be2f4e8fb7eab324b1b860f4956071e561ee6707ef6f0675c663d33557ca3766c927bef739411fdd62d1a06856a9c44c32438341fe19e996cbb543b9d8ad45c42f529e35efbd2814c8e3644f62326d829da8d475f5e699bc95f32983ef9665d4ddef776604d2b8bf83fcfbe72c6ff8374faeeac9cb0500f196064dbbf0519ae207baef31c42e2d24f1da4985c5c9cc263d0f54e97e8fa9e95f5de0bbdd9dd0a73487e47a1b52434291a7c3b744dd55863fe134ccf12ec56cbf2aee893dbe581d1b078550a4582a159ee413ead4ce63ddeaf5f4cc2405f155a82bb53746ffdc00eab861184f624cfc3c78bb8df9975125ed57d8766ea63f9d6a292dc4892ca5d45189e12dd823d40068cf6dd285694f0f9e9cb9b2709842671b59b49f4271dad22b81983d565a5b2da3296108f0f876d48ec8f8cf843d1e9ef490a9db0f5d665a0a4f1ea0d31a15109356eb5bd165e26e2482f3d83ce3c3ac9962f1dc6435e9841dc38d0e5b6e09a7c82cf12b48a8d4493788852c25e23438f09fc188f05f604ea9f59ca0d3573e28315a0bc9f306f9c5ecba297a1ad20f66a18f1b36fed71dd00ff0cb884d3e18e0f42b81db06a9e60fc91e65d27fa172468e78c1a859fb595d7c35d01c94f2ce146ce69a796ebca533f14cddd0b1541c4cffa06d10ec91067a4450'

    const decrypted = service.decrypt(str570Encrypted)
    expect(decrypted).toBe(str570)
  })

  it('should dencrypt "Holas" ok', () => {
    const holasEncriptado =
      '461447a9ba0c405ad6fabf12729ebd4c3b4074c98bf5923e40d42a0ec98fc1ae7c2b1f346217e1bdac0fe52f4c66ad50d39e63b47d26f65eeb044ceb6e35c0af'
    const decrypted = service.decrypt(holasEncriptado)
    expect(decrypted).toBe('Holas')
  })

  it('should dencrypt long text ok', () => {
    const holasMilEncriptado =
      'ae4712f11df37e7a18cfc45869ce11544cead0610e15905ae3894d9b8c2540ad208bd5e6122a22295fc2420bb6e728170bcc34a4d6724cf9f63bc86abcea762b193298c71cd0d614fe61183b78cf6d4c8563bc98611f1bcee16803d560598e9d92d777db4a6463bda598800aa19748c1'
    const decrypted = service.decrypt(holasMilEncriptado)
    expect(decrypted).toBe('HolasHolasHolasHolasHolasHolasHolasHolasHolas')
  })

  it('should verify sign', () => {
    expect(() => {
      const holasMilEncriptadoConSignatureModificado =
        '754c90335dc6add707f650dab09c93b357b61aff0504c0763a403da427fb3da876baac43d1533155900a37daba9aa56756daa6be87eff1b2c637c0fa858684a129147d6ed58af5a8c990ca7fde7efe088563bc98611f1bcee16803d560598e9d92d777db4a6463bda598800aa19748c2'
      service.decrypt(holasMilEncriptadoConSignatureModificado)
    }).toThrow(BadSignatureError)
  })

  it('should sign ok', () => {
    const hashInput = Buffer.from([
      -84,
      -19,
      0,
      5,
      116,
      0,
      13,
      77,
      101,
      108,
      105,
      115,
      97,
      78,
      97,
      118,
      97,
      114,
      114,
      111,
    ])
    const hashOutput = '1d1bf37fc1ab11c4ada1ca321a09758b1f5674a7884c23f7819d0ec20190ff56'
    expect(service.sign(hashInput)).toBe(hashOutput)
  })

  it('should encrypt and decrypt correctly', () => {
    const originalText = 'Texto que quiero encriptar'
    //mock(service.generateIv() , () => {return ivTest} )
    jest.spyOn(service, 'generateIv').mockImplementation(() => ivTest)
    const encryptedText = service.encrypt(originalText)
    const decryptedText = service.decrypt(encryptedText)

    expect(decryptedText).toBe(originalText)
  })
})
