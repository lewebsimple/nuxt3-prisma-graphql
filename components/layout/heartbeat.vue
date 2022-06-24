<script setup lang="ts">
const heartbeat = ref<boolean>(false);
useHearbeatSubscription({}, () => {
  heartbeat.value = true;
});
</script>

<template>
  <div :class="heartbeat && 'animate-heartbeat'" @animationend="heartbeat = false">
    <HeroHeartIcon class="w-4 h-4" />
  </div>
</template>
