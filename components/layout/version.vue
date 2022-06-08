<script setup lang="ts">
const { data } = await useVersionQuery();
</script>

<template>
  <div class="">
    {{ data?.version || "" }}
  </div>
</template>
