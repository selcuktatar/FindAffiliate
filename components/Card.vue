<script setup lang="ts">
const dataStore = useDataStore()
const isFirstDataLoading = ref(false)
const increaseVisitorNumber = (programId: String) => {
  try {
    $fetch(`/api/programs/increase/${programId}`,{
      method: 'POST',
      headers: {
        'x-api-key': 'your-secure-api-key'
      },
    })
  } catch (e) {
    console.error(e)
  }
}
</script>
<template>
  <UCard
      v-for="data in dataStore.filteredData"
      :key="data.id"
      class=" m-2 bg-zinc-100 hover:bg-zinc-50"
  >
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-xl font-semibold">
          {{ data.name }}
        </h1>
        <UButton
            class="hover:bg-slate-100"
            icon="i-heroicons-chevron-right"
            size="sm"
            color="black"
            variant="outline"
            square
            @click="(increaseVisitorNumber(data.id), navigateTo(
                `programs/${data.id}`, {
                  open: {
                    target: '_blank',
                  }
                }
            ))"
        />
      </div>

    </template>

    <p class="text-lg">
      <UIcon name="i-heroicons-tag" class="w-4 h-4 " />
      {{ data.categories }}
    </p>
    <p class="text-lg">
      <UIcon name="i-heroicons-calculator" class="w-4 h-4 "  />
        {{ data.commissionRate }} Commission
    </p>
    <p class="text-lg">
      <UIcon name="i-heroicons-eye" class="w-4 h-4 "  />
      {{ data.visitorNumber }} Times Visited
    </p>

    <template #footer>
        <UButton
            icon="i-heroicons-arrow-long-right"
            color="emerald"
            variant="solid"
            label="Apply to program"
            trailing
            block
            @click="navigateTo(`${data.link}`, { open:
                {
                  target: '_blank'
                }
            }
        )"
        />
    </template>
  </UCard>
  <div v-show="isFirstDataLoading">
    Loading...
  </div>
</template>