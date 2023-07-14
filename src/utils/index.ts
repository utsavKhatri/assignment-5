import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';

// Encrypt the password
export const encryptPassword = (password: string | CryptoJS.lib.WordArray) => {
  const encryptedPassword = AES.encrypt(password, 'secretKey').toString();
  return encryptedPassword;
};

// Decrypt the password
export const decryptPassword = (
  encryptedPassword: string | CryptoJS.lib.CipherParams
) => {
  const decryptedPassword = AES.decrypt(
    encryptedPassword,
    'secretKey'
  ).toString(CryptoJS.enc.Utf8);
  return decryptedPassword;
};

export const validatePasswordStrength = (password: string): boolean => {
  const minLength = 8;

  // Check for at least one lowercase letter
  const lowercaseRegex = /[a-z]/;
  if (!lowercaseRegex.test(password)) {
    return false;
  }

  // Check for at least one uppercase letter
  const uppercaseRegex = /[A-Z]/;
  if (!uppercaseRegex.test(password)) {
    return false;
  }

  // Check for at least one digit
  const digitRegex = /\d/;
  if (!digitRegex.test(password)) {
    return false;
  }

  // Check for at least one special character
  const specialCharRegex = /[!@#$%^&*]/;
  if (!specialCharRegex.test(password)) {
    return false;
  }

  return password.length >= minLength;
};
