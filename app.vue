<script setup>

useSeoMeta({
  ogImage: '/favicon.ico'
})
</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>