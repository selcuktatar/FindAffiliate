<script setup lang="ts">
const { loopsFormKey } = useRuntimeConfig().public;
const message = ref()
const newsletterEmail = ref()
function handleSubmit() {
  if (!newsletterEmail.value || newsletterEmail.value === ''|| newsletterEmail.value === undefined|| newsletterEmail.value === null) {
    return
  }
  const formBody = `email=${encodeURIComponent(newsletterEmail.value)}`;

  fetch(`https://app.loops.so/api/newsletter-form/${loopsFormKey}`, {
    method: "POST",
    body: formBody,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  newsletterEmail.value = ''
  message.value = 'Thank you for subscribe my newsletter!'
}
</script>
<template>
  <div class="flex flex-col md:flex-row items-center justify-center pt-4 max-w-screen-sm md:max-w-screen-lg mx-auto">
    <UInput v-model.trim="newsletterEmail" type="email" name="email" placeholder="hello@findaffiliate.co" required class="mb-4 md:mb-0 md:mr-4"/>
    <UButton color="black" @click="handleSubmit">Sign up newsletter</UButton>
  </div>
  <p class="pt-2">{{message}}</p>
</template>