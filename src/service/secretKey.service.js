import CryptoJS from "crypto-js";

const encryptData = (data, secretKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const secretKey = "your-secret-key"; // Use a secure key
const encryptedData = encryptData({ user: "kundan", role: "developer" }, secretKey);



// import CryptoJS from "crypto-js";

// // Match backend fixed secret and salt
// const ENCRYPTION_KEY = "`;yEgY5R/G>Bz*vN-r"; // from .env
// const FIXED_SALT = CryptoJS.enc.Hex.parse("3efbb6c51eb61e52"); // derived from expected output

// export const encryptPayload = (data) => {
//   const jsonData = JSON.stringify(data);

//   // Derive key + IV using OpenSSL's EVP_BytesToKey (MD5-based)
//   const keySize = 256 / 32 + 128 / 32; // 32 + 16 = 48 bytes total
//   const keyAndIV = CryptoJS.EvpKDF(ENCRYPTION_KEY, FIXED_SALT, { keySize, iterations: 1 });

//   const aesKey = CryptoJS.lib.WordArray.create(keyAndIV.words.slice(0, 8)); // 32 bytes
//   const iv = CryptoJS.lib.WordArray.create(keyAndIV.words.slice(8, 12)); // 16 bytes

//   // Encrypt using AES-256-CBC
//   const encrypted = CryptoJS.AES.encrypt(jsonData, aesKey, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });

//   // Final format: Salted__ + salt + ciphertext (OpenSSL-style)
//   const opensslFormat = CryptoJS.enc.Utf8.parse("Salted__").concat(FIXED_SALT).concat(encrypted.ciphertext);

//   // Ensure Base64 encoding of the final result
//   const base64Output = CryptoJS.enc.Base64.stringify(opensslFormat);
  
//   // Return the final formatted output
//   return `{ "_data": "${base64Output}" }`;
// };




// import CryptoJS from "crypto-js";

// // Match backend fixed secret and salt
// const ENCRYPTION_KEY = "`;yEgY5R/G>Bz*vN-r"; // from .env
// const FIXED_SALT = CryptoJS.enc.Hex.parse("3efbb6c51eb61e52"); // derived from expected output

// export const encryptPayload = (data) => {
//   const jsonData = JSON.stringify(data);

//   // Derive key + IV using OpenSSL's EVP_BytesToKey (MD5-based)
//   const keySize = 256 / 32 + 128 / 32; // 32 + 16 = 48 bytes total
//   const keyAndIV = CryptoJS.EvpKDF(ENCRYPTION_KEY, FIXED_SALT, {
//     keySize,
//     iterations: 1,
//   });

//   const aesKey = CryptoJS.lib.WordArray.create(keyAndIV.words.slice(0, 8));  // 32 bytes
//   const iv = CryptoJS.lib.WordArray.create(keyAndIV.words.slice(8, 12));     // 16 bytes

//   // Encrypt using AES-256-CBC
//   const encrypted = CryptoJS.AES.encrypt(jsonData, aesKey, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });

//   // Final format: Salted__ + salt + ciphertext (OpenSSL-style)
//   const opensslFormat = CryptoJS.enc.Utf8.parse("Salted__").concat(FIXED_SALT).concat(encrypted.ciphertext);
//   const base64Output = CryptoJS.enc.Base64.stringify(opensslFormat);

//   return base64Output;
// };



// import CryptoJS from "crypto-js";

// export const encryptPayload = (data) => {
//   const keyString = "`;yEgY5R/G>Bz*vN-r";
//   const salt = CryptoJS.enc.Hex.parse("3efbb6c51eb61e52"); // extracted from expected string
//   const jsonData = JSON.stringify(data);

//   // Derive key and IV using OpenSSL-compatible EVP_BytesToKey (MD5)
//   const keyAndIV = CryptoJS.EvpKDF(keyString, salt, { keySize: 256 / 32 + 128 / 32, iterations: 1 });
//   const key = CryptoJS.lib.WordArray.create(keyAndIV.words.slice(0, 8)); // 32 bytes = 256 bits
//   const iv = CryptoJS.lib.WordArray.create(keyAndIV.words.slice(8, 12)); // 16 bytes = 128 bits

//   const encrypted = CryptoJS.AES.encrypt(jsonData, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });

//   // Prefix with Salted__ + salt (OpenSSL format)
//   const opensslFormat = CryptoJS.enc.Utf8.parse("Salted__").concat(salt).concat(encrypted.ciphertext);
//   const base64 = CryptoJS.enc.Base64.stringify(opensslFormat);

//   return base64;
// };



// import CryptoJS from "crypto-js";

// // This must be a string, not a WordArray
// const secretKey = "`;yEgY5R/G>Bz*vN-r"; // exact match to backend key

// export const encryptPayload = (data) => {
//   const jsonData = JSON.stringify(data);

//   // DO NOT parse key or specify IV — let CryptoJS use OpenSSL default
//   const encrypted = CryptoJS.AES.encrypt(jsonData, secretKey); // string key = adds salt + OpenSSL format

//   return encrypted.toString(); // includes salt, produces `U2FsdGVkX1...`
// };


// import CryptoJS from "crypto-js";

// const stringKey = "`;yEgY5R/G>Bz*vN-r";

// export const encryptPayload = (data) => {
//   const jsonData = JSON.stringify(data);

//   const encrypted = CryptoJS.AES.encrypt(jsonData, stringKey); // string key, auto salt + OpenSSL format

//   return encrypted.toString(); // includes 'U2FsdGVkX1...' prefix
// };


// import CryptoJS from "crypto-js";

// // Must be 16/24/32 bytes (128/192/256 bits)
// const secretKey = CryptoJS.enc.Utf8.parse("`;yEgY5R/G>Bz*vN-r");
// const iv = CryptoJS.enc.Utf8.parse("`;yEgY5R/G>Bz*vN-r");

// export const encryptPayload = (data) => {
//   const jsonData = JSON.stringify(data);

//   const encrypted = CryptoJS.AES.encrypt(
//     CryptoJS.enc.Utf8.parse(jsonData),
//     secretKey,
//     {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     }
//   );

//   return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
// };




// import CryptoJS from 'crypto-js';
// import SECRET_KEY_CONFIG from "./SecretKeyDeclaration";

// export function EncryptedData(encryptData) {
//     const stringifiedData = JSON.stringify(encryptData);
//     const data = CryptoJS.AES.encrypt(stringifiedData, SECRET_KEY_CONFIG.NKRYPTA);
//     return data.toString();
// }

// export function DecryptedData(encryptedData) {
//     const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY_CONFIG.NKRYPTA);
//     const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
//     return JSON.parse(decryptedText);
// }




// import CryptoJS from 'crypto-js';
// import SECRET_KEY_CONFIG from "./SecretKeyDeclaration";

// export function EncryptedData(encryptData) {
//     // const data = encrypt(encryptData, SECRET_KEY_CONFIG.NKRYPTA )
//     const data = CryptoJS.AES.encrypt(JSON.stringify(encryptData), SECRET_KEY_CONFIG.NKRYPTA).toString();
//     return data;
// }

// export function DecryptedData(decryptData) {
//     // const data = decrypt(decryptData, SECRET_KEY_CONFIG.NKRYPTA )
//     const data = CryptoJS.AES.decrypt(JSON.stringify(decryptData), SECRET_KEY_CONFIG.NKRYPTA).toString();
//     return data;
// }