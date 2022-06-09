type FormValidationType =
  | "login"
  | "password"
  | "email"
  | "phone"
  | "name"
  | "notEmpty";

export default class FormValidation {
  static regex: Record<FormValidationType, RegExp> = {
    login: /^(?=.{3,20}$)[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*$/,
    password: /^(?=.{8,20}$)(?=.*)(?=.*[A-Z])(?=.*[0-9]).*$/,
    email: /^[a-zA-Z0-9_!#$%&'*+=?`{|}~^.-]+@[a-zA-Z]+\.[a-z]+$/,
    phone: /^[0-9+]\d{9,14}$/,
    name: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/,
    notEmpty: /^(?!\s*$).+$/,
  };

  static errorMessage: Record<string, string> &
    Record<FormValidationType, string> = {
    login: `Latin characters are required.
                No spaces, special symbols (a hyphen and an underscore are allowed).
                Numbers are allowed.The length must be between 3 and 20 characters.`,
    password: `At least one capital letter and number are required.
                    The length must be between 8 and 40 characters.`,
    email: `Latin characters are required.
                Numbers and special characters such as a hyphen are allowed.
                The subsequence of "@" sign, some letters and a dot after it must be there.`,
    phone: `The single plus sign is allowed at the beginning, numbers are required.
                The length must be between 10 and 15 characters.`,
    name: `Latin or Cyrillic characters are required, first letter should be capital,
                no spaces, numbers, special symbols(only a hyphen is allowed).`,
    notEmpty: `The field can't be empty.`,
    equal: `The fields are supposed to be equal.`,
  };
}
