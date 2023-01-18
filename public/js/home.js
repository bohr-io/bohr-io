// login buttons
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

// home button
const bohrLogoButton = document.querySelector('#bohr__logo__btn');
bohrLogoButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

// showcase nav
const showcaseVideo = document.querySelector('#bohr__showcase');
const showcaseNavButtons = document.querySelectorAll('[data-showcase-time]');

showcaseVideo.addEventListener('timeupdate', () => {
  showcaseNavButtons.forEach((button) => {
    if (
      showcaseVideo.currentTime > button.dataset.showcaseTime
      && showcaseVideo.currentTime < (button.nextElementSibling?.dataset.showcaseTime || 9999)
    ) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
});

showcaseNavButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const newTime = button.dataset.showcaseTime;
    showcaseVideo.currentTime = newTime;
  });
});
