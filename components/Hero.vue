<script setup lang="ts">
import Newsletter from "~/components/Newsletter.vue";

const templateTexts = ref({ mainHeadline: 'Find the Best Affiliate programs' })
const twitterTag = ref({ twitterTag: '@twselcuk', twitterLink: 'https://x.com/twselcuk' })
const totalPrograms = ref(100)
</script>
<template>
  <div class="text-center pt-10 md:pt-20 mx-auto max-w-screen-lg">
    <p class="font-extrabold text-4xl md:text-6xl ">{{ templateTexts.mainHeadline }}</p>

    <p class="pt-4 text-lg md:text-xl mx-auto max-w-screen-md">
      Discover new opportunities,
      and <span class="font-semibold">maximize</span> your affiliate marketing potential.
      We have more <span class="font-semibold">than {{totalPrograms}}+ programs.</span>
    </p>
    <p class="pt-2 text-lg md:text-xl">Made by ➡️
      <nuxt-link :to='twitterTag.twitterLink' external class="font-semibold text-black hover:text-gray-500">{{ twitterTag.twitterTag }}</nuxt-link>
    </p>
    <Newsletter />
  </div>
</template>