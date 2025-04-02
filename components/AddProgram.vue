<script setup lang="ts">
import { reactive } from 'vue'
import { useToast } from '#imports'
import { z } from 'zod'

const toast = useToast()
const header = 'Get Listed for Free & Forever'
const description = 'Drive a steady stream of lifetime traffic to your website, unlocking continuous revenue opportunities.'

const schema = z.object({
  name: z.string().min(1, 'Program name is required'),
  description: z.string().min(1, 'Description is required'),
  link: z.string().url('Invalid URL'),
  commissionRate: z.preprocess((val) => Number(val), z.number().positive('Commission rate must be a positive number')),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  email: z.string().email('Invalid email'),
})

type Schema = z.infer<typeof schema>

// ✅ Fixed Reactive State
const state = reactive<Schema>({
  name: '',
  description: '',
  link: '',
  commissionRate: 0,
  categories: [],
  email: '',
})

async function onSubmit() {
  try {
    const response = await $fetch('/api/programs', {
      method: 'POST',
      headers: {
        'x-api-key': 'your-secure-api-key'
      },
      body: state,
    })
    toast.add({ title: 'Success', description: response.message })
  } catch (error) {
    toast.add({ title: 'Error', description: 'Failed to save program' })
  }
}

</script>

<template>
  <h1 class="font-extrabold text-4xl md:text-6xl">{{ header }}</h1>
  <p class="pt-6 text-lg md:text-xl mx-auto max-w-screen-md mb-12">{{ description }}</p>

  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

    <UFormGroup label="Program Name" name="name">
      <UInput size="lg" v-model="state.name" placeholder="Enter program name" />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea size="lg" v-model="state.description" placeholder="Enter program description" />
    </UFormGroup>

    <UFormGroup label="Affiliate Link" name="link">
      <UInput size="lg" v-model="state.link" type="url" placeholder="findaffiliate.co/amazing-affiliate" />
    </UFormGroup>

    <UFormGroup label="Commission Rate" name="commissionRate">
      <UInput size="lg" v-model.number="state.commissionRate" type="number" placeholder="Enter commission rate" />
    </UFormGroup>

    <UFormGroup label="Categories (comma-separated)" name="categories">
      <UInput
          size="lg"
          v-model="state.categories"
          placeholder="Enter categories separated by commas"
          @update:model-value="state.categories = $event.split(',').map(c => c.trim()).filter(c => c)"
      />
    </UFormGroup>

    <UFormGroup label="Contact Email" name="email">
      <UInput size="lg" v-model="state.email" type="email" placeholder="hey@amazingaffiliate.com" />
    </UFormGroup>

    <UButton size="lg" type="submit" block>Save Program</UButton>
  </UForm>
</template>
