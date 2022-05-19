const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailRegex = new RegExp(EMAIL_REGEX);

export const validateEmail = email => {
  return emailRegex.test(email);
};

export const detectEnter = (e, handler) => {
  if (e.keyCode === 13 || e.which === 13) handler();
};

export const loadScript = src => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
