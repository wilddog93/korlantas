<script setup lang="ts">
import { ref } from 'vue';
import NavbarView from '@/components/NavbarView.vue';
import SidebarView from '@/components/SidebarView.vue';

const sideBar = ref<boolean>(true)
const navbarRef = ref<HTMLDivElement | null>(null)
const sidebarRef = ref<HTMLDivElement | null>(null)
// const navbarHeight = computed(
//   () => navbarRef.value?.clientHeight || 0
// )

// const calculatedHeight = computed(() => {
//   return window.innerHeight - navbarHeight.value
// })

const toggleBar = () => {
  sideBar.value = !sideBar.value
}

// watch(() => lessMore())

</script>

<template>
  <main class="relative overflow-auto">
    <NavbarView ref="navbarRef" :side-bar="sideBar" @toggle-sidebar="toggleBar" />

    <SidebarView ref="sidebarRef" @toggle-sidebar="toggleBar" :side-bar="sideBar" />

    <div @click="toggleBar" class="w-full inset-0 fixed z-20 bg-dark-900/20 sm:hidden"
      :class="[sideBar ? 'translate-x-0' : '-translate-x-full']"></div>

    <main
      class="fixed top-16 bottom-0 inset-x-0 mx-auto max-w-screen duration-300 ease-in-out overflow-x-hidden overflow-y-auto lg:ml-[20rem] p-4">
      <slot></slot>
    </main>
  </main>
</template>

<style>
.router-link-active {
  color: #FFFFFF;
  font-weight: bold;
}
</style>