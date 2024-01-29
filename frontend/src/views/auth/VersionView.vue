<script setup lang="ts">
import ImageBackground from '@/assets/images/background-image.png';
import PiCard from '@/components/ui/PiCard.vue';
import PiIcon from '@/components/ui/PiIcon.vue';
import Logo1 from '@/assets/images/logo/korlantas-logo-1.png';
import Logo2 from '@/assets/images/logo/korlantas-logo-2.png';
import PiButton from '@/components/ui/PiButton.vue';
import PiProgressBar from '@/components/ui/PiProgressBar.vue';
import { computed, ref, watch } from 'vue';

const intervalValue = ref<number>(0);
const total:number = 5000;
let intervalId: any = null;

const stopInterval = () => {
  clearInterval(intervalId);
};

const startInterval = () => {
  intervalId = setInterval(() => {
    intervalValue.value += 1;

    if (intervalValue.value === total) {
      stopInterval();
    }
  }, 1);
};

watch(startInterval,(val) => val)

const getPercent = computed(() => {
  let value = intervalValue.value;
  return Number(((value/total) * 100).toFixed(0))
})

</script>

<template>
  <div class="w-full h-screen">
    <div class="w-full h-full flex flex-col lg:flex-row overflow-auto">
      <div class="w-full lg:w-1/2 h-full bg-white p-4">
        <div class="w-full h-full flex flex-col justify-center items-center gap-4">
          <div class="w-full flex flex-col items-center gap-4" :class="[getPercent == 100 ? 'sm:h-2/3 justify-end' : 'h-full justify-center']">
            <div class="w-full flex items-center justify-center gap-2">
              <img :src="Logo1" alt="logo-1">
              <img :src="Logo2" alt="logo-2">
            </div>

            <div class="text-gray-500 text-sm tracking-wide">Memerika versi aplikasi</div>

            <div class="w-full px-6 sm:px-20">
              <PiProgressBar size="lg" variant="secondary" secondary-class="bg-secondary-600/60 text-white"
                :value="getPercent" />
            </div>

            <div class="text-gray-500 text-sm tracking-wide">Status Pemeriksaan ({{ intervalValue }}/{{ total }})</div>
          </div>

          <div v-if="getPercent == 100" class="w-full sm:h-1/3 flex flex-col items-center gap-4 justify-end">
            <p class="text-gray-500 text-sm tracking-wide">Tersedia versi terbaru:</p>
            <PiButton variant="primary" base-class="w-full max-w-[16rem] rounded-full px-4 py-3">
              <div class="flex items-center justify-center space-x-3">
                <span>ccpjrkorlantas v 1. 2. 0</span>
                <PiIcon type="download" class="w-4 h-4 text-inherit" />
              </div>
            </PiButton>
            <PiButton variant="default" base-class="w-full max-w-[16rem] rounded-full px-4 py-3 border">
              <div class="flex items-center justify-center space-x-3">
                <span>Lewati</span>
              </div>
            </PiButton>
          </div>
        </div>
      </div>

      <div class="relative w-full lg:w-1/2 h-full hidden sm:block" :style="{
        backgroundImage: `url('${ImageBackground}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }">
        <div class="bg-[#2930FF]/60 absolute z-10 inset-0">
          <div class="w-full h-full grid grid-rows-3 sm:grid-rows-5 gap-4 items-start justify-between p-6 sm:px-14">
            <h1 class="text-xl sm:text-3xl font-bold tracking-[0.5rem] text-white text-center">CC PJR KORLANTAS</h1>
            <div class="sm:row-span-2 text-xl sm:text-3xl font-bold text-white tracking-wider px-4">
              Menuju Indonesia Tertib, Bersatu, Keselamatan Nomor Satu
            </div>
            <div class="container max-auto sm:row-span-2 text-white mt-auto">
              <PiCard class="w-full bg-[#050749]/50 backdrop-blur-sm shadow-sm p-4 flex flex-col gap-3">
                <p class="mb-5 text-md tracking-wider">Kita adalah pilar keamanan, dan dengan dedikasi serta semangat
                  kita, kita akan terus menjadikan jalanan lebih aman dan nyaman bagi semua.</p>
                <div class="w-full flex flex-col sm:flex-row gap-3 items-center ">
                  <!-- <img src="" alt="avatar" class=""> -->
                  <div class="border rounded-full p-2 w-10 h-10 flex text-white font-bold">
                    <PiIcon type="user" class="w-4 h-4 text-inherit m-auto" />
                  </div>
                  <div class="flex flex-col">
                    <p class="uppercase text-gray-500 text-xs">kakorlantas</p>
                    <p class="font-bold">Drs. FIRMAN SANTYABUDI, M.Si.</p>
                  </div>
                </div>
              </PiCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>