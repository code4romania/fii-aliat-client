const isEmpty = (value) => !value;

export const storySchema = [
  {
    key: 'name',
    condition: isEmpty,
    error: 'Vă rugăm introduceți numele.',
  },
  {
    key: 'age',
    condition: isEmpty,
    error: 'Vă rugăm introduceți vârsta.',
  },
  {
    key: 'occupation',
    condition: isEmpty,
    error: 'Vă rugăm introduceți ocupația.',
  },
  {
    key: 'content',
    condition: isEmpty,
    error: 'Vă rugăm introduceți mesajul.',
  },
  {
    key: 'agreeTerms',
    condition: isEmpty,
    error:
      'Pentru a trimite povestea trebuie să fiți de acord cu termenii și condițiile platformei.',
  },
];
