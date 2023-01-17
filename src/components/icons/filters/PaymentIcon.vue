<template>
  <svg
    width="32"
    height="20"
    viewBox="0 0 32 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 2C0 0.895431 0.895431 0 2 0H30C31.1046 0 32 0.895431 32 2V18C32 19.1046 31.1046 20 30 20H2C0.895431 20 0 19.1046 0 18V2ZM1 2C1 1.44772 1.44772 1 2 1H30C30.5523 1 31 1.44772 31 2V4H1V2ZM1 8V18C1 18.5523 1.44772 19 2 19H30C30.5523 19 31 18.5523 31 18V8H1Z"
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
