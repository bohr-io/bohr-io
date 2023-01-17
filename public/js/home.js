const bohrLogoBtn = document.querySelector('#bohr__logo__btn');
bohrLogoBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

const loginButtons = [
  document.querySelector('#login__btn'),
  document.querySelector('#join__btn'),
  document.querySelector('#start__btn'),
];

const hasBohrSessionCookie = document.cookie.includes('BohrSession=');

if (hasBohrSessionCookie) {
  loginButtons.forEach((btn) => {
    btn.setAttribute('href', '/home');
  });
}
