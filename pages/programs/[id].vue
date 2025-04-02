<script setup>
import {navigateTo} from "#app";

useHead({
  title: `Best Programs - Find Affiliate`,
  meta: [
    { name: 'Best Affiliate programs', content: 'Simplest way to find the Best Affiliate programs' }
  ],
})

definePageMeta({
  layout: "custom",
  colorMode: 'light',
});
const route = useRoute ()
const programId = ref()
const programData = ref({ id: '', name: '', description: '', link: '', category: '', commission: '', visitor: '' })
const getProgramById = async () => {
  try {
    const getData = await $fetch(`/api/programs/${programId.value}`,{
      method: 'GET',
    })
    console.log(getData);
    if (getData?.length === 0 || getData?.isListed === false) {
      return navigateTo('/')
    }

    programData.value.id = getData?.id
    programData.value.name = getData?.name
    programData.value.description = getData?.description
    programData.value.link = getData?.link
    programData.value.category = getData?.categories
    programData.value.commission = getData?.commissionRate
    programData.value.visitor = Math.round(Number(getData?.visitorNumber))

  } catch (e) {
    console.error(e)
  }

}
const clickedToVisitButton = async () => {
  try {
    await increaseVisitorNumber().then(() => {
      return navigateTo(`${programData?.value?.link}`, {external: true})
    })
  } catch (e) {
    console.error(e)
  }
}

const increaseVisitorNumber = async () => {
  try {
    await $fetch(`/api/programs/increase/${programId.value}`,{
      method: 'POST',
      body: JSON.stringify({
        userId: programData?.value?.id,
      })
    })
  } catch (e) {
    console.error(e)
  }
}

useSeoMeta({
  title: () => `${programData.value?.name} Affiliate Programs - Earn ${programData.value.commission} `,
  description: () => programData.value?.description,
  ogTitle: () => `${programData.value?.name} Affiliate Programs - Earn ${programData.value.commission} `,
});

useServerSeoMeta({
  ogTitle: () => `${programData.value?.name} Affiliate Programs - Earn ${programData.value.commission}`,
  title: () => `${programData.value?.name} Affiliate Programs - Earn ${programData.value.commission}`,
  description: () => programData.value?.description,
  ogDescription: () => programData.value?.description,
})

onMounted( () => {
  programId.value = route.params.id
  getProgramById()

})
</script>
<template>
  <div class="">
    <div class="text-center pt-24 mx-auto mb-24">
      <h1 class="font-extrabold text-5xl">
        {{ programData?.name }}
      </h1>
      <p class="pt-10">
        {{ programData?.description }}
      </p>
      <p class="pt-3 font-semibold">Commission Rate: <span>{{ programData?.commission }}</span></p>
      <p class="pt-3">
        #{{ programData?.category }}
      </p>
      <UBadge  class="mt-2">{{programData?.visitor}} Time Visited</UBadge>
      <div>
        <UButton class="mt-6 mb-24" size="xl" color="white" variant="solid" @click="clickedToVisitButton">Visit {{programData?.name}}</UButton>
      </div>

    </div>

      <DisqusComments :identifier="'/blog/'+ programId?.value" />

  </div>
</template>