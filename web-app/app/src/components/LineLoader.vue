<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'bg-blue-600'
  }
});
</script>

<template>
<div class="flex justify-center items-center min-h-screen">
  <div class="loader-container">
    <div class="loader-line">
      <div :class="[color, 'loader-highlight']"></div>
    </div>
  </div>
</div>
</template>

<style scoped>
.loader-container {
  width: 80%;
  max-width: 300px;
  padding: 10px 0;
}

.loader-line {
  position: relative;
  height: 6px;
  width: 100%;
  background-color: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.loader-highlight {
  position: absolute;
  height: 100%;
  width: 40%;
  border-radius: 3px;
  animation: moveHighlight 1.5s ease-in-out infinite;
}

@keyframes moveHighlight {
  0% {
    left: -40%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: -40%;
  }
}
</style>