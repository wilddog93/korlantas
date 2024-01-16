<script setup lang="ts">
import PiInput from '@/components/ui/PiInput.vue';
import PiInputGroup from '@/components/ui/PiInputGroup.vue';
import { ref } from 'vue';

const value = ref('');
const showPassword = ref(false);
</script>

<template>
  <h1 class="text-lg font-medium border-b pb-2 mb-5 flex">Inputs</h1>
  <div>
   <div>
    <div class="grid grid-cols-3 gap-3">
      <PiInputGroup label="Email">
        <PiInput v-model="value" placeholder="Input your email." />
      </PiInputGroup>
      <PiInputGroup label="Email">
        <PiInput v-model="value" prefix-icon="mail" />
      </PiInputGroup>
      <PiInputGroup label="Password">
        <PiInput
          v-model="value"
          :suffix-icon="showPassword ? 'eye-off' : 'eye'"
          :type="showPassword ? 'text' : 'password'"
          @click-suffix-icon="showPassword = !showPassword"
        />
      </PiInputGroup>
      <PiInputGroup label="Password">
        <PiInput v-model="value" suffix-icon="eye" type="password" />
      </PiInputGroup>
      <PiInputGroup label="email" has-error hint="Please type your email">
        <PiInput v-model="value" type="email" prefix-icon="mail" />
      </PiInputGroup>
    </div>
    <div class="mt-5">
      Input is {{ value }}
    </div>
   </div>
  </div>
</template>