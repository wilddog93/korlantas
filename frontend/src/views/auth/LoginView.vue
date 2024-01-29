<script setup lang="ts">
import ImageBackground from '@/assets/images/background-image.png';
import PiCard from '@/components/ui/PiCard.vue';
import PiIcon from '@/components/ui/PiIcon.vue';
import Logo1 from '@/assets/images/logo/korlantas-logo-1.png';
import Logo2 from '@/assets/images/logo/korlantas-logo-2.png';
import { ref } from 'vue';
import PiInputGroup from '@/components/ui/PiInputGroup.vue';
import PiInput from '@/components/ui/PiInput.vue';
import PiButton from '@/components/ui/PiButton.vue';

const value = ref('');
const password = ref('')
const showPassword = ref(false);

</script>

<template>
  <div class="w-full h-screen">
    <div class="w-full h-full flex flex-col lg:flex-row overflow-auto">
      <div class="w-full lg:w-1/2 h-full bg-white px-10 sm:px-24 py-10">
        <div class="w-full flex flex-col gap-4">
          <div class="w-full flex items-center justify-center gap-2 mb-10">
            <img :src="Logo1" alt="logo-1">
            <img :src="Logo2" alt="logo-2">
          </div>

          <div class="text-gray-800 text-xl sm:text-4xl font-semibold tracking-wider mb-3">Login disini untuk melanjutkan
          </div>
          <div class="text-gray-500 text-base tracking-wider mb-8">Gunakan ID pengguna yang telah diberikan oleh Pusat</div>

          <div class="w-full flex flex-col">
            <PiInputGroup label="ID Pengguna" label-class="text-gray-800 font-bold text-base">
              <PiInput height-class="h-12" placeholder="Username" input-class="px-4" v-model="value" prefix-icon="user" prefix-icon-class="w-5 h-5 fill-primary-600 text-primary-600" />
            </PiInputGroup>
            <PiInputGroup label="Kata Sandi" label-class="text-gray-800 font-bold text-base">
              <PiInput height-class="h-12" placeholder="Kata Sandi" v-model="password" prefix-icon="lock" prefix-icon-class="w-5 h-5 text-primary-600" :suffix-icon="showPassword ? 'eye-off' : 'eye'"
              suffix-icon-class="fill-primary-600 text-white w-6 h-6"
                :type="showPassword ? 'text' : 'password'" @click-suffix-icon="showPassword = !showPassword" />
            </PiInputGroup>
            <PiButton type="button" default-class="ml-auto font-semibold hover:bg-none mb-5">
              <span>Lupa kata sandi?</span>
            </PiButton>

            <PiButton :to="{ name: 'home' }" type="button" variant="primary" base-class="outline-none focus:outline-none focus:shadow-none px-5 h-10 border border-transparent font-medium rounded-full text-base leading-6 inline-flex items-center justify-center align-middle relative text-center">
              <div class="flex items-center gap-1">
                <span class="text-md">Login</span>
                <PiIcon type="chevron-right" class="text-inherit w-4 h-4" />
              </div>
            </PiButton>
          </div>
          <div class="text-gray-500 text-sm tracking-wider mt-10">Versi Aplikasi ccpjrkorlantas. v 1..0.0</div>
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