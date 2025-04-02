<script setup>

useHead({
  title: 'Simplest way to find the Best Affiliate programs - Find Affiliate',
  meta: [
    { name: 'Simplest way to find the Best Affiliate programs', content: 'Simplest way to find the Best Affiliate programs' }
  ],
})

definePageMeta({
  layout: "custom",
  colorMode: 'light',
});

</script>

<template>
    <Hero />
    <SearchFilter />
  <div class="pt-12 mx-auto max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    <Card />

  </div>
</template>
<style>
::-webkit-scrollbar {
  width: 0.6em;
}::-webkit-scrollbar-track {
   background: #fff;
 }

::-webkit-scrollbar-thumb {
  background: rgb(219, 219, 219);
  border-radius: 1em;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(219, 219, 219);
}

</style>