<template>
  <svg
    v-if="show"
    class="checkmark"
    viewBox="0 0 52 52"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="checkmark__circle"
      cx="26"
      cy="26"
      fill="none"
      r="25"
    />
    <path
      class="checkmark__check"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
      fill="none"
    />
  </svg>
</template>

<script>
export default {
  name: 'SuccessCheckMark',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}

</style>
