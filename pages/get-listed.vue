<script setup>
import AddProgram from "~/components/AddProgram.vue";

useHead ({
  title: 'Get Listed on our Affiliate Directory Website',
  meta: [
    { name: 'Get Listed on our Affiliate Directory Website', content: 'Explore our curated selection, discover new opportunities and maximize your affiliate marketing potential.' }
  ],
})

definePageMeta({
  layout: "custom",
  colorMode: 'light',
});

</script>

<template>
  <div class="text-center pt-10 md:pt-20 mx-auto max-w-screen-lg">
    <AddProgram/>
  </div>
</template>
<style scoped>
.container {
  max-width: 100%;
}

</style>