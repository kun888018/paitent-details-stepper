import CryptoJS from 'crypto-js';
import SECRET_KEY_CONFIG from '../service/SecretKeyDeclaration';

const secretKey = `dfhjdfjhjdfhjdf=8_nlxhhhfbhsfsdifh@sd4$_8xw__1#y@^0$l(u&r554*&^j)@`;
// const secretKey = process.env.REACT_APP_CRYPTO_KEY;

// console.log("secretKey=====>", secretKey);

console.log(process.env.REACT_APP_CRYPTO_KEY);

// OpenSSL-compatible EVP_BytesToKey using MD5
const evpKDF = (password, salt, keySize, ivSize) => {
  const hashFunction = CryptoJS.algo.MD5.create();
  let keyIv = CryptoJS.lib.WordArray.create();
  let prev = CryptoJS.lib.WordArray.create();

  while (keyIv.words.length < (keySize + ivSize)) {
    hashFunction.reset();
    hashFunction.update(prev.concat(CryptoJS.enc.Utf8.parse(password)).concat(salt));
    prev = hashFunction.finalize();
    keyIv.concat(prev);
  }

  const key = CryptoJS.lib.WordArray.create(keyIv.words.slice(0, keySize));
  const iv = CryptoJS.lib.WordArray.create(keyIv.words.slice(keySize, keySize + ivSize));
  return { key, iv };
};

export const encryptData = (data) => {
  const plaintext = JSON.stringify(data);
  const salt = CryptoJS.lib.WordArray.random(8); // 8-byte salt

  const { key, iv } = evpKDF(secretKey, salt, 8, 4); // 8 words = 32 bytes, 4 words = 16 bytes

  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const opensslPayload = CryptoJS.enc.Utf8.parse('Salted__').concat(salt).concat(encrypted.ciphertext);
  return CryptoJS.enc.Base64.stringify(opensslPayload);
};

export const decryptData = (base64String) => {
  const encryptedData = CryptoJS.enc.Base64.parse(base64String);

  const salt = CryptoJS.lib.WordArray.create(
    encryptedData.words.slice(2, 4),
    8
  );
  const ciphertext = CryptoJS.lib.WordArray.create(
    encryptedData.words.slice(4),
    encryptedData.sigBytes - 16
  );

  const { key, iv } = evpKDF(secretKey, salt, 8, 4);

  const decrypted = CryptoJS.AES.decrypt({ ciphertext }, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};
