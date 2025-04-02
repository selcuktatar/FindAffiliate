<script setup>
const appName = 'Find Affiliate';
const logo = '/logo.svg';
const { metaSymbol } = useShortcuts()

defineShortcuts({
  meta_b: {
    usingInput: true,
    handler: () => {
      navigateTo('/get-listed')
    }
  }
})
</script>

<template>
  <nav class="bg-white">
    <div class="container mx-auto flex items-center justify-between px-8 py-6">
      <div class="flex items-center">
        <nuxt-link class="flex items-center" to="/">
          <img :src="logo" alt="Logo" class="h-9 mr-2">
          <span class="text-black text-xl font-extrabold hover:text-gray-400">{{ appName }}</span>
        </nuxt-link>
      </div>
      <div class="flex items-center">
        <UButton to="/get-listed" size="md" color="black">
          <div class="flex items-center gap-0.5">
            <UKbd>{{ metaSymbol }}</UKbd>
            <UKbd>B</UKbd>
          </div>
          to Get Listed
          </UButton>
      </div>
    </div>
  </nav>
</template>
