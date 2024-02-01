<script setup lang="ts">
import PiIcon from '@/components/ui/PiIcon.vue';
import PiButton from '@/components/ui/PiButton.vue';


interface Props {
  id?: string | number;
  title?: string;
  items?: Props[];
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'add-item'): void,
}>()

defineOptions({
  name: 'FormComponent'
})

</script>

<template>
  <div class="grid grid-cols-1 gap-3">
    <h3 v-if="title" class="text-lg">{{ title }}</h3>
    <div class="flex flex-wrap gap-2">
      <div v-for="(item) in items" :key="item.id"
        class="flex items-center gap-1 border border-gray-300 bg-gray-200 rounded-full py-2 px-4 text-gray-600 text-sm">
        <span>{{ item.title }}</span>
        <button :click="() => console.log('click')">
          <PiIcon type="trash" class="w-4 h-4 text-inherit" />
        </button>
      </div>

      <PiButton variant="primary" base-class="rounded-full text-sm px-4 py-2" @click="$emit('add-item')">
        <div class="flex items-center gap-1">
          <span>Tambah Baru</span>
          <PiIcon type="plus" class="w-4 h-4 text-inherit" />
        </div>
      </PiButton>
    </div>
  </div>
</template>