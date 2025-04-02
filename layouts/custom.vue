<script setup lang="ts">
import { useDataStore } from "~/stores/data";
const dataStore = useDataStore();
const isLoading = ref(true);

const { data: categories } = useFetch('/api/categories', {
  method: 'GET',
});

const { data: programs } = useFetch('/api/programs', {
  method: 'GET',
});

watch(categories, (newCategories) => {
  if (newCategories && newCategories.value) {
    console.log('Categories updated:', newCategories.value);
    dataStore.updateCategories(newCategories.value);
  }
}, { deep: true });

watch(programs, (newPrograms) => {
  if (newPrograms && newPrograms.value) {
    console.log('Programs updated:', newPrograms.value);
    dataStore.updatePrograms(newPrograms.value);
    dataStore.updateFilteredData(newPrograms.value);
    isLoading.value = false;
  }
}, { deep: true });

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