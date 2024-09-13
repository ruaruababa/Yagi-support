export function toLowerCaseNonAccentVietnamese(text: string) {
  let str = text.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export const filterOption: any = (
  input: string,
  option: {
    code: string;
    name: string;
  },
) => {
  const query = toLowerCaseNonAccentVietnamese(input);
  const label = toLowerCaseNonAccentVietnamese(option?.name);
  return label.includes(query);
};

export function randomString(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const searchVietnameseWord = (str: string, keyword: string) => {
  const query = toLowerCaseNonAccentVietnamese(keyword);
  const label = toLowerCaseNonAccentVietnamese(str);
  return label.includes(query);
};

export function convertLabelTokey(input: string) {
  if (!input) {
    return undefined;
  }

  // Chuyển hết sang chữ thường
  let str = input.trim().toLowerCase();

  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, '_');

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, '-');

  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, '');

  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, '');

  // return
  return str;
}

export function JSONParse(json: string, defaultValue: unknown) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return defaultValue;
  }
}

export function getFirstLetterOfWord(str: string) {
  if (typeof str !== 'string') {
    return null;
  }

  const words = str.split(' ');
  const firstLetters = words.map((word) => word[0]);
  return firstLetters.join('').toUpperCase();
}

export function generateStrongPassword(length: number): string {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialCharacters = '!@#$%^&*()_-+=<>?/{}[]';

  const allCharacters = [
    uppercaseLetters,
    lowercaseLetters,
    numbers,
    specialCharacters,
  ];

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomCharacter = allCharacters[i] || lowercaseLetters;
    const randomIndex = Math.floor(Math.random() * randomCharacter.length);
    password += randomCharacter.charAt(randomIndex);
  }

  return password;
}

export function cutString(str: string, max = 50) {
  if (typeof str !== 'string') return str;
  if (str.length > max) {
    return `${str.slice(0, max)}...`;
  }
  return str;
}
