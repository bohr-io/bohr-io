<template>
  <template v-if="hasSlash">
    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M23.5 10C23.5 10.1295 23.4493 10.3223 23.2988 10.5797C23.1507 10.8331 22.923 11.1199 22.6152 11.4277C21.9998 12.0431 21.1028 12.7042 20.0072 13.3129C17.8139 14.5314 14.897 15.5 12 15.5C9.10302 15.5 6.1861 14.5314 3.99282 13.3129C2.89719 12.7042 2.0002 12.0431 1.3848 11.4277C1.077 11.1199 0.849291 10.8331 0.701217 10.5797C0.550742 10.3223 0.5 10.1295 0.5 10C0.5 9.87055 0.550742 9.67773 0.701217 9.42025C0.849291 9.16688 1.077 8.88011 1.3848 8.5723C2.0002 7.9569 2.89719 7.29576 3.99282 6.68708C6.1861 5.46859 9.10302 4.5 12 4.5C14.897 4.5 17.8139 5.46859 20.0072 6.68708C21.1028 7.29576 21.9998 7.9569 22.6152 8.5723C22.923 8.88011 23.1507 9.16688 23.2988 9.42025C23.4493 9.67773 23.5 9.87055 23.5 10Z" stroke="white" />
        <circle cx="12" cy="10" r="6" fill="white" />
        <circle cx="12" cy="10" r="5" fill="black" />
        <circle cx="12" cy="10" r="3" fill="white" />
        <circle cx="13.5" cy="8.5" r="1.5" fill="black" />
        <rect x="19.1426" width="4.04061" height="24.2437" rx="2" transform="rotate(45 19.1426 0)" fill="black" />
        <rect x="20.1523" y="1.00977" width="1.01015" height="24.2437" rx="0.505076" transform="rotate(45 20.1523 1.00977)" fill="white" />
      </g>
    </svg>
  </template>

  <template v-else>
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M23.5 6C23.5 6.12945 23.4493 6.32227 23.2988 6.57975C23.1507 6.83312 22.923 7.11989 22.6152 7.4277C21.9998 8.04309 21.1028 8.70424 20.0072 9.31292C17.8139 10.5314 14.897 11.5 12 11.5C9.10302 11.5 6.1861 10.5314 3.99282 9.31292C2.89719 8.70424 2.0002 8.04309 1.3848 7.4277C1.077 7.11989 0.849291 6.83312 0.701217 6.57975C0.550742 6.32227 0.5 6.12945 0.5 6C0.5 5.87055 0.550742 5.67773 0.701217 5.42025C0.849291 5.16688 1.077 4.88011 1.3848 4.5723C2.0002 3.9569 2.89719 3.29576 3.99282 2.68708C6.1861 1.46859 9.10302 0.5 12 0.5C14.897 0.5 17.8139 1.46859 20.0072 2.68708C21.1028 3.29576 21.9998 3.9569 22.6152 4.5723C22.923 4.88011 23.1507 5.16688 23.2988 5.42025C23.4493 5.67773 23.5 5.87055 23.5 6Z" stroke="white" />
        <circle cx="12" cy="6" r="6" fill="white" />
        <circle cx="12" cy="6" r="5" fill="black" />
        <circle cx="12" cy="6" r="3" fill="white" />
        <circle cx="13.5" cy="4.5" r="1.5" fill="black" />
      </g>
    </svg>
  </template>
</template>

<script>
export default {
  props: {
    hasSlash: Boolean
  }  
}
</script>
