<template>
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16ZM1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16C31 24.2843 24.2843 31 16 31C7.71573 31 1 24.2843 1 16ZM14 8H15V10H14V8ZM18 8H17V10H18V8ZM14 22H15V24H14V22ZM18 22H17V24H18V22ZM20 14C20 12.3431 18.6569 11 17 11H12V15V17V21H18C19.6569 21 21 19.6569 21 18C21 16.9377 20.4479 16.0044 19.615 15.4714C19.8601 15.0366 20 14.5347 20 14ZM14 17V19L18.0005 19.0005C18.5528 19.0005 19.0005 18.5528 19.0005 18.0005C19.0005 17.4877 18.6145 17.065 18.1172 17.0073L18.0005 17.0005L14 17ZM17.0338 15H14V13L17.0005 13.0005L17.1172 13.0073C17.6145 13.065 18.0005 13.4877 18.0005 14.0005C18.0005 14.5417 17.5707 14.9824 17.0338 15Z"
      :fill="active ? `url(#gradient)` : '#F1F1F1'"
    />
    <defs>
      <linearGradient
        id="gradient"
        x1="0.0282677"
        y1="0.0124585"
        x2="0.0282677"
        y2="31.9808"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F4CD3B" />
        <stop offset="0.54" stop-color="#F16622" />
        <stop offset="1" stop-color="#E84856" />
      </linearGradient>
    </defs>
  </svg>
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
