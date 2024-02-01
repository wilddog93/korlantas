<script setup lang="ts">
import Layout from '@/components/LayoutView.vue';
import PiSelect, { type Option as SelectOption } from '@/components/ui/PiSelect.vue';
import PiCard from '@/components/ui/PiCard.vue';

// data
import { dataInduk } from '@/data-lakalantas'
import { computed, ref } from 'vue';

// component
import FormComponent from '@/components/command-center/FormComponent.vue';

const dataLaka = [
  { id: 1, title: 'item-1' }, 
  { id: 2, title: 'item-2' },
  { id: 3, title: 'item-3' },
  { id: 4, title: 'item-4' },
  { id: 5, title: 'item-5' },
  { id: 6, title: 'item-6' },
]

// induk-option
const selectedInduk = ref<string>("");

const searchInduk = computed(() => {
  return dataInduk.filter(c => {
    return c.label.toLowerCase().includes(selectedInduk.value.toLowerCase())
  })
})

</script>


<template>
  <Layout>
    <div class="w-full bg-gray-100 p-4 tracking-wide">
      <div class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5">
        <div class="w-full lg:w-1/2">
          <h3 class="font-semibold text-lg">Pengaturan Formulir</h3>
        </div>
        <div class="w-full lg:w-1/2 flex items-center justify-end gap-2">
          <div class="w-full max-w-[12rem]">
            <PiSelect show-search v-model:search="selectedInduk"
              btn-class="w-[14rem] lg:w-[12rem] rounded-full py-2 focus:border focus:border-primary-500 bg-white"
              v-model="selectedInduk" :options="searchInduk" :selected-text="selectedInduk" placeholder="Pilih Induk" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PiCard class="bg-white rounded-xl shadow-sm p-4">
          <h1 class="font-bold text-xl sm:text-2xl mb-3">A, Data Lantas</h1>

          <FormComponent class="mb-3" title="1. Jenis Laka" :items="dataLaka" />
          <FormComponent class="mb-3" title="2. Volume Lain" :items="dataLaka" />
          <FormComponent class="" title="3. Kondisi Alam" :items="dataLaka" />
        </PiCard>

        <PiCard class="bg-white rounded-xl shadow-sm p-4">
          <h1 class="font-bold text-xl sm:text-2xl mb-3">B, Data Pengegemudi & Korban</h1>

          <FormComponent class="mb-3" title="1. Usia" :items="dataLaka" />
          <FormComponent class="mb-3" title="2. Pekerjaan" :items="dataLaka" />
          <FormComponent class="mb-3" title="3. Pendidikan" :items="dataLaka" />
          <FormComponent class="" title="4. Golongan SIM" :items="dataLaka" />
        </PiCard>
      </div>
    </div>
  </Layout>
</template>