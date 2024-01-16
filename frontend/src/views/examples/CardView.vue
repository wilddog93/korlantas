<script setup lang="ts">
import PiIcon from '@/components/ui/PiIcon.vue';
import PiCard from '@/components/ui/PiCard.vue';
</script>

<template>
  <h1 class="text-lg font-medium border-b pb-2 mb-5 flex">Cards</h1>
  <div class="grid grid-cols-3">
   <PiCard class="text-white bg-slate-950 p-6">
    <div class="flex items-center space-x-3">
      <div class="h-12 w-12 flex items-center justify-center bg-slate-700 rounded-full">
        <PiIcon type="corner-right-up"></PiIcon>
      </div>
      <h3 class="font-extralight">Top Alasan Kecelakaan</h3>
    </div>
    <div class="flex items-center space-x-6 mt-5 border-b border-slate-800 pb-6 mb-6">
      <div>
        <span class="text-4xl font-medium">17</span>
        <span>%</span>
      </div>
      <div>
        <div class="font-medium">Kurang Konsentrasi</div>
        <div class="text-sm font-extralight">Mengantuk/Lelah</div>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <a href="#" class="font-medium">Lihat Semua</a>
    </div>
   </PiCard>
  </div>
</template>