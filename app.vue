<template>
  <div>
    <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
</script>
<style>
body {
  margin: 0;
  background-image: url("http://img.yishiyu.world/timelineserver/background/4ef410ce36d3d5395cd4edeb3487e950342ab0c8.jpg");
}
</style>
