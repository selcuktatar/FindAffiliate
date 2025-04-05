<script setup lang="ts">
import { useDataStore } from "~/stores/data"
const dataStore = useDataStore()

onMounted(async () => {
  await getCategories()
  await getPrograms()

})

const getPrograms = async () => {
  const { data: categories } = useFetch('/api/programs', {
    method: 'GET',
  })
  dataStore.updatePrograms(categories)
  dataStore.updateFilteredData(categories)
}

const getCategories = async () => {
  const { data: categories } = useFetch('/api/categories', {
    method: 'GET',
  })
  dataStore.updateCategories(categories);
}

</script>

<template>
  <div>
    <div >
      <Navbar />
    </div>
    <div id="main" class="pt-6 md:pt-2 w-full md:w-6/7 p-6">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
#main {
  background: #e7f5ec;
}
@media (max-width: 640px) {
  #main {
    width: 100%; /* Make the main content area full-width on smaller screens */
  }
}
</style>