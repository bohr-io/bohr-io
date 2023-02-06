// login buttons
const loginButtons = document.querySelectorAll('[data-login]');

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

// showcase video
const showcaseVideo = document.querySelector('#bohr__showcase');
const showcaseNavButtons = document.querySelectorAll('button[data-showcase-time]');
const showcaseTexts = document.querySelectorAll('span[data-showcase-time]');

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
  
  showcaseTexts.forEach((button) => {
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
