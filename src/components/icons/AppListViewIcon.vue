<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1 0C0.447715 0 0 0.447715 0 1V7C0 7.55228 0.447715 8 1 8H7C7.55228 8 8 7.55228 8 7V1C8 0.447715 7.55228 0 7 0H1ZM13 0C12.4477 0 12 0.447715 12 1V7C12 7.55228 12.4477 8 13 8H19C19.5523 8 20 7.55228 20 7V1C20 0.447715 19.5523 0 19 0H13ZM0 13C0 12.4477 0.447715 12 1 12H7C7.55228 12 8 12.4477 8 13V19C8 19.5523 7.55228 20 7 20H1C0.447715 20 0 19.5523 0 19V13ZM13 12C12.4477 12 12 12.4477 12 13V19C12 19.5523 12.4477 20 13 20H19C19.5523 20 20 19.5523 20 19V13C20 12.4477 19.5523 12 19 12H13Z"
      :fill="active ? `url(#paint)` : '#666666'"
    />
    <defs>
      <linearGradient
        id="paint"
        x1="0.0176673"
        y1="0.00778657"
        x2="0.0176673"
        y2="19.9881"
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
