export const isValidBase64 = (str: string): boolean => {
    try {
      return Buffer.from(str, 'base64').toString('base64') === str;
    } catch (err) {
      return false;
    }
  };
  
  export const isValidMeasureType = (type: string): boolean => {
    return ['WATER', 'GAS'].includes(type.toUpperCase());
  };
  