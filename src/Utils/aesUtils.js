import CryptoJS from 'crypto-js';

function stringToByteArray(str) {
  return Array.from(new TextEncoder().encode(str));
}

function flattenWordArray(wordArray) {
  return wordArray.words.flatMap(word => [
    (word >> 24) & 0xff,
    (word >> 16) & 0xff,
    (word >> 8) & 0xff,
    word & 0xff,
  ]).slice(0, wordArray.sigBytes);
}

function md5(data) {
  return CryptoJS.MD5(CryptoJS.lib.WordArray.create(data)).words.flatMap(word => [
    (word >> 24) & 0xff,
    (word >> 16) & 0xff,
    (word >> 8) & 0xff,
    word & 0xff,
  ]);
}

function evpBytesToKey(password, salt) {
  let data = [];
  let dx = [];

  while (data.length < 48) {
    dx = md5([...dx, ...password, ...salt]);
    data = [...data, ...dx];
  }

  return {
    key: data.slice(0, 32),
    iv: data.slice(32, 48),
  };
}

export function encryptObjectWithFixedSalt(obj, passphrase) {
  const text = JSON.stringify(obj);
  const salt = [0x0f, 0xbe, 0xf6, 0xc5, 0x1e, 0xb6, 0x1e, 0x52]; // Fixed salt
  const passwordBytes = stringToByteArray(passphrase);
  const { key, iv } = evpBytesToKey(passwordBytes, salt);

  const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.lib.WordArray.create(key), {
    iv: CryptoJS.lib.WordArray.create(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const saltedPrefix = stringToByteArray('Salted__');
  const encryptedBytes = flattenWordArray(CryptoJS.enc.Base64.parse(encrypted.toString()));
  const resultBytes = [...saltedPrefix, ...salt, ...encryptedBytes];

  return CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create(resultBytes));
}
