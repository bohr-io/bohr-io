<template>
  <svg
    width="20"
    height="18"
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 1C0 0.447715 0.447715 0 1 0H19C19.5523 0 20 0.447715 20 1C20 1.55228 19.5523 2 19 2H1C0.447715 2 0 1.55228 0 1ZM0 5C0 4.44772 0.447715 4 1 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H1C0.447715 6 0 5.55228 0 5ZM1 8C0.447715 8 0 8.44771 0 9C0 9.55229 0.447715 10 1 10H19C19.5523 10 20 9.55229 20 9C20 8.44771 19.5523 8 19 8H1ZM0 17C0 16.4477 0.447715 16 1 16H19C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18H1C0.447715 18 0 17.5523 0 17ZM1 12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H19C19.5523 14 20 13.5523 20 13C20 12.4477 19.5523 12 19 12H1Z"
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
