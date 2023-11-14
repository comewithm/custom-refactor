import JSEncrypt from 'jsencrypt';

export function encryption(publicKey:string, word: string) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(word) as string;
}

export function decrypt(publicKey: string, word: string) {
  let encrypt = new JSEncrypt();
  encrypt.setPrivateKey(publicKey);
  return encrypt.decrypt(word);
}
