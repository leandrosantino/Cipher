
const ALPHABET = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "\'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", " "
]

interface CrypterProps {
  text: string
  key: string
  type: 'encrypt' | 'decrypt'
}

export function crypter({ key, text, type }: CrypterProps) {

  const textAsVector = text.trim().toUpperCase().split('')
  const keyAsVector = keyVectorExtender(
    key.trim().toUpperCase().split(''),
    textAsVector.length
  )

  let cipher = ''

  textAsVector.forEach((text, index) => {
    const msgIndex = ALPHABET.indexOf(text)
    const keyIndex = ALPHABET.indexOf(keyAsVector[index])
    let encryptedCharIndex: number = 0
    if (type === 'encrypt') encryptedCharIndex = (keyIndex + msgIndex) % ALPHABET.length
    if (type === 'decrypt') encryptedCharIndex = ((msgIndex - keyIndex) + ALPHABET.length) % ALPHABET.length
    cipher += ALPHABET[encryptedCharIndex]
  })

  return cipher
}


function keyVectorExtender(keyVector: string[], length: number) {

  const extendedKeyVector = []

  let keyVectorIndex = 0
  for (let i = 0; i <= length - 1; i++) {
    if (keyVectorIndex > keyVector.length - 1) keyVectorIndex = 0
    extendedKeyVector.push(keyVector[keyVectorIndex])
    keyVectorIndex++
  }

  return extendedKeyVector
}
