<script setup lang="ts">
import {useDataStore} from "~/stores/data";

const dataStore = useDataStore()
const query = ref()
const selectedCategory = ref(null);
const sortValues = ['Random', 'High to Low', 'Low to High']
const sortingValues = ref(sortValues[0])

const showHighToLowItems = () => {
  dataStore.filteredData.sort((a, b) => parseFloat(b.commissionRate) - parseFloat(a.commissionRate))
}
const showLowToHighItems = () => {
  dataStore.filteredData.sort((a, b) => parseFloat(a.commissionRate) - parseFloat(b.commissionRate))
}
const showRandomItems = () => {
  dataStore.filteredData.sort(() => Math.random() - 0.5);
}
const checkSortingValue = () => {
  if (sortingValues.value === 'Random') {
    showRandomItems()
  }
  if (sortingValues.value === 'High to Low') {
    showHighToLowItems()
  }
  if (sortingValues.value === 'Low to High') {
    showLowToHighItems()
  }
}

const selectCategory = (category: any) => {
  if (selectedCategory.value === category.name) {
    selectedCategory.value = null
    dataStore.filteredData = dataStore.programs
    return
  }
  selectedCategory.value = category.name
  filterDataByCategory(category.name)
}

const filterDataByCategory = (category: String) => {

  if (!category) return;
  dataStore.filteredData = []
  for ( let i = 0; i < dataStore.programs.length; i++) {
    if (dataStore.programs[i].categories === category) {
      dataStore.filteredData.push(dataStore.programs[i])
    }
  }
};

const clearSearchQuery = () => {
  query.value = ''
  dataStore.updateFilteredData(dataStore.programs)
}

const filterDataBySearch = () => {
  const q = query.value.trim().toLowerCase();

  if (!q) {
    dataStore.filteredData = [...dataStore.programs];
    return;
  }
  dataStore.filteredData = dataStore.filteredData.filter(item => {
    return (
        item?.name.toLowerCase().includes(q) ||
        item?.description.toLowerCase().includes(q) ||
        item?.categories.toLowerCase().includes(q)
    );
  });
};

watch(query, filterDataBySearch);
watch(sortingValues, checkSortingValue);
</script>
<template>
  <div class="pt-8 mx-auto max-w-screen-xl">
    <UInput
        v-model="query"
        size="xl"
        name="query"
        placeholder="Search among 100+ items..."
        icon="i-heroicons-magnifying-glass-20-solid"
        autocomplete="off"
        :ui="{ icon: { trailing: { pointer: '' } } }"

    >
      <template #trailing>
        <UButton
            v-show="query !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="clearSearchQuery()"
        />
      </template>
    </UInput>
    <div class="pt-4 md:max-w-screen-xl md:mx-auto">
      <div class="p-2 flex items-center justify-between overflow-x-auto ">
        <div class="flex flex-no-wrap	">
          <UButton
              v-for="category in dataStore.categories"
              :key="category"
              class="m-1"
              size="md"
              :color="category.name === selectedCategory ? 'white' : 'black'"
              :ui="{ rounded: 'rounded-full' }"
              @click="selectCategory(category)"
          >
            {{ category.name }}
          </UButton>
        </div>
      </div>
    </div>
    <div class="pt-4 md:max-w-screen-xl md:mx-auto">
      <div class="p-2 flex items-center justify-between overflow-x-auto ">
        <div class="flex flex-no-wrap	"/>
        <div>
          <USelect v-model="sortingValues" :options="sortValues" />
        </div>
      </div>
    </div>
  </div>
</template>