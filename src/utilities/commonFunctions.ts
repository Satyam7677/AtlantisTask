const regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;

const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  export const validateEmail = (email: string): string => {
    if (!regexEmail.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };
  export const validatePassword = (password: string): string => {
    if (password.length === 0) {
      return 'Please enter password';
    } else if (regexPassword.test(password) === false) {
      return 'Invalid password, must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character';
    } else if (!regexPassword.test(password)) {
      return 'Please enter a valid password.';
    }
    return '';
  };