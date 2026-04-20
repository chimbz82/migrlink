export function validateSouthAfricanID(idNumber: string): boolean {
  if (!idNumber || !/^\d{13}$/.test(idNumber)) return false;

  let sum = 0;
  for (let i = 0; i < 13; i++) {
    let digit = parseInt(idNumber.charAt(12 - i), 10);
    if (i % 2 !== 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
